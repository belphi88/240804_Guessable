const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Country = require("../models/countryQuestions");
const Movie = require("../models/movieQuestions");
const People = require("../models/peopleQuestions");
const bcrypt = require("bcrypt");
const { QuestionsConstants } = require("../utils/constants");
const Question = require("./question");
const QuestionModel = require("../models/questions");
const Utils = require("../utils/utils");
class UserServices {
  static jobs = [{}];

  /**
   * This function will create a user
   * @param {*} body
   * @returns
   */
  static async createUser(body) {
    const { name, email, password, confirmPassword, timezone } = body;

    // Check if email is already in use
    let user = await User.findOne({ where: { email } });
    if (user) {
      const error = new Error("Failed! Email is already in use!");
      error.statusCode = 409;
      throw error;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      const error = new Error("Failed! Passwords do not match!");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      timeZone: timezone
    });
    // Generate JWT token
    const token = UserServices.getJwtToken(user);

    delete user.password;
    const response = {
      user,
      token: token
    };

    return response;
  }

  /**
   * the function will be used in sign in
   * @param {*} body
   */
  static async signin(body) {
    const email = body.email;
    const password = body.password;

    // Find user by email
    let user = await User.findOne({
      where: { email },
      raw: true
    });
    if (!user) {
      const error = new Error("Could not find the user");
      error.statusCode = 404;
      throw error;
    }

    // Check if password matches
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      const error = new Error("Password is incorrect");
      error.statusCode = 401;
      throw error;
    }

    delete user.password; // Remove password from the user object

    // Generate JWT token
    const token = UserServices.getJwtToken(user);
    user = {
      userId: user.userId,
      name: user.name,
      oAuthProvider: user.oAuthProvider,
      oAuthId: user.oAuthId,
      createdAt: user.createdAt,
      countryStreak: user.countryStreak,
      movieStreak: user.movieStreak,
      timeZone: user.timeZone,
      maxStreak: user.maxStreak,
      updatedAt: user.updatedAt
    };

    return {
      token,
      user
    };
  }

  static async signinWithOAuth(oAuthData) {
    // Destructure OAuth data
    const { email, name, oAuthId, additionalData, oAuthProvider, timezone } =
      oAuthData;

    // Check if user already exists in the database
    let user = await User.findOne({
      where: {
        email: email
      },
      raw: true
    });

    // If user doesn't exist, create a new user
    if (!user) {
      (user = await User.create({
        name: name,
        oAuthProvider: oAuthProvider,
        oAuthId: oAuthId,
        email: email,
        additionalData: additionalData,
        timezone
      })),
        {
          raw: true
    };
    const response = {
      userId: user.userId,
      name: user.name,
      oAuthProvider: user.oAuthProvider,
      oAuthId: user.oAuthId,
      email: user.email,
      additionalData: user.additionalData,
      countryStreak: user.countryStreak,
      movieStreak: user.movieStreak,
      peopleStreak: user.peopleStreak,
    };
    const token = UserServices.getJwtToken(user);

    return { user: response, token: token, exists: false };
    } else {
      const response = {
        userId: user.userId,
        name: user.name,
        oAuthProvider: user.oAuthProvider,
        oAuthId: user.oAuthId,
        email: user.email,
        additionalData: user.additionalData,
        countryStreak: user.countryStreak,
        movieStreak: user.movieStreak,
        peopleStreak: user.peopleStreak
      };
      const token = UserServices.getJwtToken(user);
      return { user: response, token: token, exists: true };
    }
  }

  static getJwtToken(user) {
    // Create the JWT token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.userId.toString()
      },
      process.env.JWT_SECRET,
      { expiresIn: "3day" }
    );

    return token;
  }

  static async updateStreak(isCorrect, userId, questionType) {
    const user = await User.findOne({ where: { userId: userId }, raw: true });
    let updatedUser = {};
    if (isCorrect) {
      if (questionType === QuestionsConstants.COUNTRY)
        updatedUser.countryStreak = user.countryStreak + 1;
      else if (questionType === QuestionsConstants.MOVIE)
        updatedUser.movieStreak = user.movieStreak + 1;
      else if (questionType === QuestionsConstants.PEOPLE)
        updatedUser.peopleStreak = user.peopleStreak + 1;
    } else {
      if (questionType === QuestionsConstants.COUNTRY)
        updatedUser.countryStreak = 0;
      else if (questionType === QuestionsConstants.MOVIE)
        updatedUser.movieStreak = 0;
      else if (questionType === QuestionsConstants.PEOPLE)
        updatedUser.peopleStreak = 0;
    }
    updatedUser.maxStreak = UserServices.getMaxStreak(
      user.maxStreak,
      updatedUser.countryStreak,
      updatedUser.movieStreak,
      updatedUser.peopleStreak
    );

    console.log("user from updatedUser");
    console.log(updatedUser);
    console.log(updatedUser.maxStreak);

    const [updatedRows] = await User.update(
      { ...updatedUser },
      { where: { userId: userId } },
      { raw: true }
    );
    console.info(
      `Streak for user with userId ${userId} has been updated to ${JSON.stringify(
        updatedUser
      )}`
    );
    return updatedUser;
  }

  static async getStreaks(id) {
    const user = await User.findOne({ where: { userId: id }, raw: true });
    if (!user) {
      const error = new Error(`Could not find the user with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    console.log(user);
    return {
      countryStreak: user.countryStreak,
      movieStreak: user.movieStreak,
      peopleStreak:user.peopleStreak,
      maxStreak: user.maxStreak
    };
  }
  static async setStreaks({ countryStreak, movieStreak, peopleStreak, userId }) {
    const user = await User.findByPk(userId);

    if (user) {
      if (countryStreak !== undefined) user.countryStreak = countryStreak;
      if (movieStreak !== undefined) user.movieStreak = movieStreak;
      if (peopleStreak !== undefined) user.peopleStreak = peopleStreak;
      user.maxStreak = UserServices.getMaxStreak(
        user.maxStreak,
        user.countryStreak,
        user.movieStreak,
        user.peopleStreak
      );

      await user.save();

      return { success: true, message: "Streaks updated successfully" };
    } else {
      throw new Error("Could not update Streaks");
    }
  }

  static async incrementStreaks({
    countryStreakIncrement,
    movieStreakIncrement,
    userId
  }) {
    // Find the user by userId
    const user = await User.findByPk(userId);

    // Update the countryStreak and movieStreak fields
    if (user) {
      // Increment the countryStreak and movieStreak fields if provided
      if (countryStreakIncrement) user.countryStreak += countryStreakIncrement;
      if (movieStreakIncrement) user.movieStreak += movieStreakIncrement;
      user.maxStreak = UserServices.getMaxStreak(
        user.maxStreak,
        user.countryStreak,
        user.movieStreak
      );
      // Save the changes to the database
      const response = await user.save();
      return { success: true, message: "Streaks updated successfully" + user };
    } else {
      throw new Error("Could not update Streaks");
    }
  }

  static async scheduleJob(userId, type) {
    console.log(type);
    const user = await User.findByPk(userId, {
      raw: true
    });
    const job = UserServices.scheduleJobForNextMidnight(user, type);
  }
  static scheduleJobForNextMidnight(user, type) {
    const currentDate = new Date().toLocaleString("en-US", {
      // timeZone: user.timeZone,
      timeZone: "Asia/Kolkata"
    });

    const nextMidnight = new Date(currentDate);
    nextMidnight.setHours(24, 0, 0, 0); // Set to the next midnight

    const timeDifference =
      nextMidnight.getTime() - new Date().getTime() + 86400000; //86400000 for a whole day as I want the next day's midnight

    // Schedule the job to run at the next midnight
    const job = setTimeout(async () => {
      try {
        console.log("Scheduled job running at next midnight.");
        // const date = Utils.getPreviousDayDate(user.timeZone);
        const date = Utils.getPreviousDayDate("Asia/Kolkata");
        const question = await Question.getQuestionOnlyNoChild(
          date,
          user.userId,
          type
        );
        console.log(question);
        const attemptInfo = question.attemptInfo;
        console.log("checking streak");
        if (!attemptInfo.isCorrect == false) {
          let obj =
            type == QuestionsConstants.COUNTRY
              ? { countryStreak: 0 }
              : { movieStreak: 0 };
          obj.userId = user.userId;
          await UserServices.setStreaks(obj);
        }
      } catch (err) {
        console.error(err);
      }
    }, timeDifference);
    return job;
  }

  static getMaxStreak(maxStreak, countryStreak, movieStreak, peopleStreak, userId) {
    console.log(maxStreak, countryStreak, movieStreak);
    if (!maxStreak) {
      maxStreak = { countryStreak: 0, movieStreak: 0, peopleStreak : 0 };
    }

    const updatedMaxCountryStreak =
      countryStreak > maxStreak.countryStreak
        ? countryStreak
        : maxStreak.countryStreak;
    const updatedMaxMovieStreak =
      movieStreak > maxStreak.movieStreak ? movieStreak : maxStreak.movieStreak;

    const updatedMaxpeopleStreak =
      peopleStreak > maxStreak.peopleStreak
        ? peopleStreak
        : maxStreak.peopleStreak;

    const updatedStreak = {
      countryStreak: updatedMaxCountryStreak,
      movieStreak: updatedMaxMovieStreak,
      peopleStreak : updatedMaxpeopleStreak
    };
    console.log("updatedStreak", updatedStreak);
    return updatedStreak;
  }

  static getAllCountries = async () => {
    try {
      const countries = await Country.findAll({
        attributes: ["countryName"],
        group: ["countryName"]
      });
      return countries.map((country) => ({
        value: country.countryName,
        label: country.countryName
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  static getAllpeople = async () => {
    try {
      const people = await People.findAll({
        attributes: ["personName"],
        group: ["personName"]
      });
      return people.map((person) => ({
        value: person.personName,
        label: person.personName
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  static getAllMovies = async () => {
    try {
      const movies = await Movie.findAll({
        attributes: ["movieName"],
        group: ["movieName"]
      });
      return movies.map((movie) => ({
        value: movie.movieName,
        label: movie.movieName
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = UserServices;
