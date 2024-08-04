const User = require("../models/user");
const QuestionModel = require("../models/questions");
const Attempt = require("../models/attempts");
const Utils = require("../utils/utils");
const CountryQuestion = require("../models/countryQuestions");
const MovieQuestion = require("../models/movieQuestions");
const { QuestionsConstants } = require("../utils/constants");
const QuestionStatsForUnregisteredUser = require("../models/questionStats");
const UnregisteredAttempt = require("../models/unregisteredAttempts");
const { response } = require("express");

class Question {
  constructor(model) {
    this.model = model;
  }

  async getQuestion(date, userId) {
    try{
      const question = await QuestionModel.findOne({
      include: [
        {
          model: this.model,
          required: true
        }
      ],
      where: {
        date: date
      },
      raw: true
    });
    if (!question) {
      const error = new Error("Could not find the Question");
      // error.statusCode = 404;
      // throw error;
      return undefined
    }
    let attempt = await Attempt.findOne({
      where: {
        userID: userId,
        quesID: question.id
      },
      raw: true
    });

    // Create a new attempt if it doesn't exist
    if (!attempt) {
      attempt = await Attempt.create({
        userID: userId,
        quesID: question.id
      });

      // Extract raw response
      attempt = attempt.get({ plain: true });
      console.info("Attempt created: " + attempt); // Log the raw attempt data
    }

    const response = { ...question, attemptInfo: attempt };
    console.info(response);
    return response;
  }catch(e){
    return undefined
    }
  }

  async getQuestionByCurrentdate(userId) {
    const user = await User.findByPk(userId, {
      attributes: ["timeZone"],
      raw: true
    });
    const date = Utils.getCurrentDate(user.timeZone);
    const question = await this.getQuestion(date, userId);
    return question;
  }

  async getQuestionById(id) {
    const question = await this.model.findOne({
      where: {
        quesID: id
      },
      raw: true
    });
    return question;
  }

  static async getQuestionStats(quesId) {
    const questionAttemptsData = await Attempt.findAll({
      include: [
        {
          model: QuestionModel,
          where: { id: quesId }, // Condition to match quesID with Question id
          attributes: ["id"] // Specify the attributes you want to retrieve from the QuestionModel
        }
      ],
      attributes: ["id", "attemptValue", "isCorrect"], // Specify the attributes you want to retrieve from the Attempt model
      raw: true
    });

    if (!questionAttemptsData || questionAttemptsData.length === 0) {
      // let error = new Error(
      //   `Could not find attempt data with question id ${quesId}`
      // );
      // error.statusCode = 404;
      // throw error;
      return 0;
    }
    console.log("AttempData: ", questionAttemptsData);
    // Initialize counters for each attempt value
    const attemptCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0 //could not give correct answer
    };

    // Count the number of correct attempts for each attempt value
    questionAttemptsData.forEach((attempt) => {
      if (attempt.isCorrect) {
        attemptCounts[attempt.attemptValue]++;
      } else {
        attemptCounts[5]++;
      }
    });

    const totalAttempts = questionAttemptsData.length;

    // Calculate the percentage of users who solved in each attempt
    const stats = {};
    for (let attemptValue = 1; attemptValue <= 4; attemptValue++) {
      const solvedCount = attemptCounts[attemptValue];
      const percentage = (solvedCount / totalAttempts) * 100;
      stats[`Attempt ${attemptValue}`] = `${percentage.toFixed(2)}%`;
    }

    const solvedCount = attemptCounts[5];
    const percentage = (solvedCount / totalAttempts) * 100;
    stats["Could not give correct answer"] = `${percentage.toFixed(2)}%`;
    console.info(`Stats for question id: ${quesId}: ${JSON.stringify(stats)}`);
    stats.totalAttempts = totalAttempts;
    return stats;
  }

  // Function to get stats for unregistered users
  static async getQuestionStatsForUnregisteredAttempts(quesId) {
    const unregisteredAttemptsData = await UnregisteredAttempt.findAll({
      include: [
        {
          model: QuestionModel,
          where: { id: quesId },
          attributes: ["id"]
        }
      ],
      attributes: ["id", "attemptValue", "isCorrect"],
      raw: true
    });

    if (!unregisteredAttemptsData || unregisteredAttemptsData.length === 0) {
      return {
        "Attempt 1": "0.00%",
        "Attempt 2": "0.00%",
        "Attempt 3": "0.00%",
        "Attempt 4": "0.00%",
        "Could not give correct answer": "0.00%",
        totalAttempts: 0
      };
    }

    const attemptCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    unregisteredAttemptsData.forEach((attempt) => {
      if (attempt.isCorrect) {
        attemptCounts[attempt.attemptValue]++;
      } else {
        attemptCounts[5]++;
      }
    });

    const totalAttempts = unregisteredAttemptsData.length;

    const stats = {};
    for (let attemptValue = 1; attemptValue <= 4; attemptValue++) {
      const solvedCount = attemptCounts[attemptValue];
      const percentage = (solvedCount / totalAttempts) * 100;
      stats[`Attempt ${attemptValue}`] = `${percentage.toFixed(2)}%`;
    }

    const solvedCount = attemptCounts[5];
    const percentage = (solvedCount / totalAttempts) * 100;
    stats["Could not give correct answer"] = `${percentage.toFixed(2)}%`;
    console.info(
      `Stats for question id: ${quesId} (unregistered): ${JSON.stringify(
        stats
      )}`
    );
    stats.totalAttempts = totalAttempts;
    return stats;
  }

  static combineResponses(response1, response2) {
    const combinedResponse = {};
    const totalAttemptsCombined =
      response1.totalAttempts + response2.totalAttempts;

    // Helper function to convert percentage strings to numbers
    const parsePercentage = (str) => parseFloat(str.replace("%", ""));

    // Helper function to convert numbers to percentage strings
    const toPercentage = (num) => `${(num * 100).toFixed(2)}%`;

    // Combine the responses
    const keys = Object.keys(response1).filter(
      (key) => key !== "totalAttempts"
    );

    keys.forEach((key) => {
      const value1 = parsePercentage(response1[key]);
      const value2 = parsePercentage(response2[key]);
      const totalValue =
        (value1 * response1.totalAttempts + value2 * response2.totalAttempts) /
        totalAttemptsCombined;
      combinedResponse[key] = toPercentage(totalValue / 100);
    });

    return combinedResponse;
  }

  async getQuestionByDate(date, userId, isRegistered) {
    const question = await QuestionModel.findOne({
      where: {
        date: date
      },
      include: [
        {
          model: this.model,
          required: true
        }
      ],
      raw: true
    });

    if (!question) {
      let error = new Error("Could not find question please try again!");
      error.statusCode = 404;
      throw error;
    }
    let attemptInfo = {};
    if (isRegistered) {
      let attempt = await Attempt.findOne({
        where: {
          userID: userId,
          quesID: question.id
        },
        raw: true
      });
      // Create a new attempt if it doesn't exist
      if (!attempt) {
        attempt = await Attempt.create({
          userID: userId,
          quesID: question.id
        });
        // Extract raw response
        attempt = attempt.get({ plain: true });
        console.info("Attempt created: " + attempt); // Log the raw attempt data
      }
      
      attemptInfo = attempt;
    } else {
      let attempt = await UnregisteredAttempt.findOne({
        where: {
          userID: userId,
          quesID: question.id
        },
        raw: true
      });
      // Create a new attempt if it doesn't exist
      if (!attempt) {
        attempt = await UnregisteredAttempt.create({
          userID: userId,
          quesID: question.id
        });
        // Extract raw response
        attempt = attempt.get({ plain: true });
        console.info("Attempt created: " + attempt); // Log the raw attempt data
      }

      attemptInfo = attempt;
    }

    const response = { ...question, attemptInfo };
    return response;
  }

  async getQuestionForUnregisteredUser(date, userId) {
    console.log("RECEIVED USED IDDD ", userId , typeof userId);
    if(userId !== "null"){
    const question = await QuestionModel.findOne({
      include: [
        {
          model: this.model,
          required: true
        }
      ],
      where: {
        date: date
      },
      raw: true
    });
    if (!question) {
      const error = new Error("Could not find the Question");
      error.statusCode = 404;
      throw error;
    }
    let attemptInfo = {};
    
    // try{
      let attempt = await UnregisteredAttempt.findOne({
      where: {
        userID: userId,
        quesID: question.id
      },
      raw: true
    });
    // Create a new attempt if it doesn't exist
    if (!attempt) {
      attempt = await UnregisteredAttempt.create({
        userID: userId,
        quesID: question.id
      });
      // Extract raw response
      attempt = attempt.get({ plain: true });

    }
    attemptInfo = attempt;

    const response = { ...question, attemptInfo };
    return response;
  }
  }

  static async getQuestionOnlyNoChild(date, userId, type) {
    console.log(type);
    const model =
      type == QuestionsConstants.COUNTRY
        ? { model: CountryQuestion }
        : { model: MovieQuestion };
    const question = await QuestionModel.findOne({
      where: {
        date: date
      },
      include: [model],
      raw: true
    });
    if (!question) {
      const error = new Error("Could not find the Question");
      error.statusCode = 404;
      throw error;
    }

    let attempt = await Attempt.findOne({
      where: {
        userID: userId,
        quesID: question.id
      },
      raw: true
    });
    if (!attempt) {
      attempt = await Attempt.create({
        userID: userId,
        quesID: question.id
      });
      attempt = attempt.get({ plain: true });
    }
    let response = { ...question, attemptInfo: attempt };
    return response;
  }

  async questionTypeStats(userId, isAuth) {
    let questions;
    if(isAuth){
    questions = await QuestionModel.findAll({
      include: [
        {
          model: this.model,
          required: true,
          attributes: []
        },
        {
          model: Attempt,
          required: true,
          attributes: ["id", "attemptValue", "isCorrect"],
          where: {
            userId: userId
          }
        }
      ],
      attributes: ["id"],
      raw: true
    });
    } else {
      console.log("UNREGISTERED STATS USER ID ", userId)
      questions = await QuestionModel.findAll({
        include: [
          {
            model: this.model,
            required: true,
            attributes: []
          },
          {
            model: UnregisteredAttempt,
            required: true,
            attributes: ["id", "attemptValue", "isCorrect"],
            where: {
              userId: userId
            }
          }
        ],
        attributes: ["id"],
        raw: true
      });
    }

    console.log(questions);

    // Counters for each attempt value and win count
    let attemptCounts = { 1: 0, 2: 0, 3: 0, 4: 0, X: 0 }; // Object to store count of each attempt value
    let winCount = 0;
    let scoreNumerator = 0;
    let scoreDenominator = 0;
    if(isAuth){
    questions.forEach((question) => {
      const attemptValue = question["Attempts.attemptValue"];
      if (
        attemptValue >= 1 &&
        attemptValue <= 4 &&
        question["Attempts.isCorrect"] === 1
      ) {
        attemptCounts[attemptValue]++;
        if (question["Attempts.isCorrect"] === 1) {
          winCount++;
          switch (attemptValue) {
            case 1:
              scoreNumerator += 1;
              break;
            case 2:
              scoreNumerator += 0.75;
              break;
            case 3:
              scoreNumerator += 0.5;
              break;
            case 4:
              scoreNumerator += 0.25;
              break;
          }
        }
      } else {
        if (attemptValue !== null) {
          attemptCounts["X"]++; // Increment count for unattempted guesses
        }
      }
      scoreDenominator++;
    });
    } else {
          questions.forEach((question) => {
            const attemptValue = question["UnregisteredAttempts.attemptValue"];
            if (
              attemptValue !== null &&
              attemptValue >= 1 &&
              attemptValue <= 4 &&
              question["UnregisteredAttempts.isCorrect"] === 1
            ) {
              attemptCounts[attemptValue]++;
              if (question["UnregisteredAttempts.isCorrect"] === 1) {
                winCount++;
                switch (attemptValue) {
                  case 1:
                    scoreNumerator += 1;
                    break;
                  case 2:
                    scoreNumerator += 0.75;
                    break;
                  case 3:
                    scoreNumerator += 0.5;
                    break;
                  case 4:
                    scoreNumerator += 0.25;
                    break;
                }
              }
            } else {
              if (attemptValue !== null) {
                attemptCounts["X"]++; // Increment count for unattempted guesses
              }
            }
            scoreDenominator++;
          });
    }
    // Count attempts and wins


    // Calculate win percentage
    const totalAttempts = Object.values(attemptCounts).reduce(
      (total, count) => total + count,
      0
    );
    const winPercentage = (winCount / totalAttempts) * 100;

    // Calculate guess distribution
    const guessDistribution = {};
    for (let key in attemptCounts) {
      guessDistribution[key] =
        ((attemptCounts[key] / totalAttempts) * 100).toFixed(2) + "%";
    }

    // Calculate average score
    const averageScore = (100 * scoreNumerator) / scoreDenominator;

    // Return the result
    return {
      guessDistribution,
      played: totalAttempts,
      winPercentage: winPercentage.toFixed(2),
      averageScore: averageScore.toFixed(2)
    };
  }
}

module.exports = Question;
