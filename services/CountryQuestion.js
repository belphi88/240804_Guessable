const Question = require("./question");
const { QuestionsConstants } = require("../utils/constants");
const CountryQuestionModel = require("../models/countryQuestions");
class CountryQuestion extends Question {
  constructor() {
    super(CountryQuestionModel);
  }
  async getQuestion(date, userId) {
    try {
      let question = await super.getQuestion(date, userId);
      return this.createQuestionResponse(question);
    } catch(e){
      return undefined
    }
  }

  async getQuestionByDate(date, userId, isRegistered) {
    let question = await super.getQuestionByDate(date, userId, isRegistered);
    return this.createQuestionResponse(question);
  }

  async getQuestionForUnregisteredUser(date, userID) {
    console.log("country question get question for unregistered user");
    try {
      let question = await super.getQuestionForUnregisteredUser(date, userID);
      if (!question) {
        let error = new Error("Could not fetch question please try again!");
        // error.statusCode = 404;
        // throw error;
        return undefined;
      }

      return this.createQuestionResponse(question);
    } catch (e) {
      return undefined;
    }
  }

  createQuestionResponse(question) {
    let response = {};
    // Check if question is empty or not an array
    if (!question) {
      let error = new Error("Could not fetch question please try again!");
      error.statusCode = 200;
      // throw error;
    }

    // Construct response object
    let attempt = question.attemptInfo;
    let attemptInfo = {
      id: attempt.id,
      attemptValue: attempt.attemptValue,
    };
    let attemptValue = attempt.attemptValue;
    attemptInfo.maxAttempts = QuestionsConstants.maxAttempts;
    attemptInfo.isCorrect = attempt.isCorrect;
    if (attemptValue >= 1) {
      attemptInfo.clueOne = {
        LatLong: question["CountryQuestion.clueLatLong"]
      };
      response.allResponses = [attempt.firstAttempt];
    }

    if (attemptValue >= 2) {
      attemptInfo.clueTwo = {
        Flag: question["CountryQuestion.clueFlag"]
      };
      response.allResponses = [attempt.firstAttempt, attempt.secondAttempt];
    }

    if (attemptValue >= 3) {
      attemptInfo.clueThree = {
        Capital: question["CountryQuestion.clueCapital"]
      };
      response.allResponses = [
        attempt.firstAttempt,
        attempt.secondAttempt,
        attempt.thirdAttempt
      ];
    }
      if (attempt.isCorrect || attemptValue == 4) {
        attemptInfo.clueOne = {
          LatLong: question["CountryQuestion.clueLatLong"]
        };
        attemptInfo.clueTwo = {
          Flag: question["CountryQuestion.clueFlag"]
        };
        attemptInfo.clueThree = {
          Capital: question["CountryQuestion.clueCapital"]
        };
        response.answer = question["CountryQuestion.countryName"];
        response.clueMainAfter = question.clueMainAfter;
        response.allResponses = [
          attempt.firstAttempt,
          attempt.secondAttempt,
          attempt.thirdAttempt,
          attempt.fourthAttempt
        ]; 
    }
    response = {
      ...response,
      id: question.id,
      date: question.date,
      clueMainBefore: question.clueMainBefore,
      clueImage: question.clueImage,
      wikiLink: question["CountryQuestion.wikiLink"], // Assuming this is correct
      attemptsInfo: attemptInfo,
    };

    return response;
  }
}
module.exports = CountryQuestion;
