const Attempt = require("../services/attempt");
const UserServices = require("../services/user");
const { validationResult } = require("express-validator");
const QuestionStatsForUnregisteredUser = require('../models/questionStats')
const UnregisteredAttemptModel = require("../models/unregisteredAttempts");
const AttemptModel = require("../models/attempts")
const Question = require("../models/questions");
const CountryQuestion = require("../models/countryQuestions");
const MovieQuestion = require("../models/movieQuestions");

const PeopleQuestion = require("../models/peopleQuestions");
const moment = require("moment");

/**
 * Create a new wallet (user) by simply taking address as input
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg || "Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const response = await UserServices.createUser(req.body);
    res.status(201).json({
      user: response.user,
      token: response.token,
      message: "Sign up success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg || "Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const responseData = await UserServices.signin(req.body);
    res.status(200).json({
      user: responseData.user,
      token: responseData.token,
      message: "Sign in success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.signInWithOAuth = async (req, res, next) => {
  try {
    const responseData = await UserServices.signinWithOAuth(req.body);
    res.status(200).json({
      user: responseData.user,
      token: responseData.token,
      message: "Sign in success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addQuestions = async (req, res, next) => {
  try {
    const rawData = req.body;
    const restructredData = [];

    // Helper function to format dates
    const formatDate = (dateStr) =>
      moment(dateStr, "DD-MMM-YY").format("YYYY-MM-DD");

    // Helper function to check for existing questions
    const checkExistingQuestion = async (date, model) => {
      return await Question.findOne({
        include: [
          {
            model: model,
            required: true
          }
        ],
        where: {
          date: date
        },
        raw: true
      });
    };

    // Process MovieQuestions
    for (const movie of rawData?.MovieQuestions || []) {
      const date = formatDate(movie.date);
      if (!(await checkExistingQuestion(date, MovieQuestion))) {
        restructredData.push({
          date: date,
          clueMainBefore: movie.clueMainBefore,
          clueMainAfter: movie.clueMainAfter,
          clueImage:
            movie.clueImage !== "NA" ? movie.clueImage : "sample_image.jpg",
          category: "movie",
          answer: movie.movieName,
          MovieQuestion: {
            movieName: movie.movieName,
            clueYear: movie.clueYear,
            clueDirector: movie.clueDirector,
            clueCast: JSON.parse(movie.clueCast),
            imdbLink: movie.imdbLink
          }
        });
      }
    }

    // Process Countries
    for (const country of rawData?.Countries || []) {
      const date = formatDate(country.date);
      if (!(await checkExistingQuestion(date, CountryQuestion))) {
        restructredData.push({
          date: date,
          clueMainBefore: country.clueMainBefore.replace(
            "(Country)",
            "(Country)"
          ),
          clueMainAfter: country.clueMainAfter.replace(
            "(Country)",
            country.countryName
          ),
          clueImage:
            country.clueImage !== "NA" ? country.clueImage : "sample_image.jpg",
          category: "country",
          answer: country.countryName,
          CountryQuestion: {
            countryName: country.countryName,
            clueLatLong: {
              lat: country.clueLatLong.split(", ")[0],
              long: country.clueLatLong.split(", ")[1]
            },
            clueFlag: country.clueFlag,
            clueCapital: country.clueCapital,
            wikiLink: country.wikiLink
          }
        });
      }
    }

    // Process People
    for (const person of rawData?.People || []) {
      const date = formatDate(person.date);
      if (!(await checkExistingQuestion(date, PeopleQuestion))) {
        restructredData.push({
          date: date,
          clueMainBefore: person.clueMainBefore.replace("X", person.personName),
          clueMainAfter: person.clueMainAfter.replace("X", person.personName),
          clueImage:
            person.clueImage !== "NA" ? person.clueImage : "sample_image.jpg",
          category: "people",
          answer: person.personName,
          PeopleQuestion: {
            personName: person.personName,
            clueNationality: person.clueNationality,
            clueLifespan: person.clueLifespan,
            clueInitials: person.clueInitials,
            wikiLink: person.wikiLink
          }
        });
      }
    }

    for (const questionData of restructredData) {
      const {
        CountryQuestion: countryData,
        MovieQuestion: movieData,
        PeopleQuestion: peopleData,
        ...question
      } = questionData;
      const createdQuestion = await Question.create(question);

      if (countryData) {
        await CountryQuestion.create({
          ...countryData,
          clueLatLong: JSON.stringify(countryData.clueLatLong),
          quesID: createdQuestion.id
        });
      }

      if (movieData) {
        await MovieQuestion.create({
          ...movieData,
          clueCast: JSON.stringify(movieData.clueCast),
          quesID: createdQuestion.id
        });
      }

      if (peopleData) {
        await PeopleQuestion.create({
          ...peopleData,
          quesID: createdQuestion.id
        });
      }
    }

    res.status(200).json({
      message: "Questions added successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred while adding questions"
    });
  }
};


exports.signupWithGameData = async (req, res, next) => {
 try {
   const { signUpType, attemptDataArr, userInfo, streaks, userID } = req.body;
   let signupResponse;

   if (signUpType == "oauth") {
     signupResponse = await UserServices.signinWithOAuth(userInfo);
   } else {
     signupResponse = await UserServices.createUser(userInfo);
   }
   if(!signupResponse?.exists) {
   await UserServices.setStreaks({
     countryStreak: streaks.countryStreak,
     movieStreak: streaks.movieStreak,
     peopleStreak: streaks.peopleStreak,
     userId: signupResponse.user.userId
   });
   const unregisteredAttempts = await UnregisteredAttemptModel.findAll({
     where: {
       userID: userID
     }
   })
   for (const attempt of unregisteredAttempts) {
     const unregisteredAttempt = await UnregisteredAttemptModel.findOne({
       where: {
         quesID: attempt.quesID,
         userID: userID
       }
     });

     if (unregisteredAttempt) {
       await UnregisteredAttemptModel.destroy({
         where: {
           quesID: attempt.quesID,
           userID: userID
         }
       });

       const newAttemptData = {
         quesID: attempt.quesID,
         userID: signupResponse.user.userId,
         attemptValue: unregisteredAttempt.attemptValue,
         isCorrect: unregisteredAttempt.isCorrect,
         firstAttempt: unregisteredAttempt.firstAttempt,
         secondAttempt: unregisteredAttempt.secondAttempt,
         thirdAttempt: unregisteredAttempt.thirdAttempt,
         fourthAttempt: unregisteredAttempt.fourthAttempt
       };

       const existingAttempt = await AttemptModel.findOne({
         where: {
           quesID: attempt.quesID,
           userID: signupResponse.user.userId
         }
       });

       if (existingAttempt) {
         await AttemptModel.update(newAttemptData, {
           where: {
             quesID: attempt.quesID,
             userID: signupResponse.user.userId
           }
         });
       } else {
         await AttemptModel.create(newAttemptData);
       }
     }
   }
   }

   res.status(200).json({
     user: signupResponse.user,
     token: signupResponse.token,
     message: "Sign in success"
   });
 } catch (err) {
   console.log(err);
   next(err);
 }
};


exports.getStreaks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const streaks = await UserServices.getStreaks(userId);
    res.status(200).json(streaks);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllCountries = async (req, res, next) => {
  try {
    const countries = await UserServices.getAllCountries();
    res.status(200).json(countries);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await UserServices.getAllMovies();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAllPeople = async (req, res, next) => {
  try {
    const people = await UserServices.getAllpeople();
    res.status(200).json(people);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
