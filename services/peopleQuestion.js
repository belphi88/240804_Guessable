const Question = require("./question");
const PeopleQuestionModel = require("../models/peopleQuestions");
const { QuestionsConstants } = require("../utils/constants");
class PeopleQuestion extends Question {
  constructor() {
    super(PeopleQuestionModel);
  }

  async getQuestion(date, userId) {
    try {
      let question = await super.getQuestion(date, userId);
      return this.createQuestionResponse(question);
    } catch (e) {
      return undefined;
    }
  }

  async getQuestionByDate(date, userId, isRegistered) {
    let question = await super.getQuestionByDate(date, userId, isRegistered);
    return this.createQuestionResponse(question);
  }

  async getQuestionForUnregisteredUser(date, userID) {
    console.log("movie question get question for unregistered user");
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
    if (!question) {
      let error = new Error("Could not fetch question please try again!");
      error.statusCode = 404;
      throw error;
    }
    // Construct response object
    let attempt = question.attemptInfo;
    let attemptInfo = {
      id: attempt.id,
      attemptValue: attempt.attemptValue
    };
    attemptInfo.maxAttempts = QuestionsConstants.maxAttempts;
    attemptInfo.isCorrect = attempt.isCorrect;

    let attemptValue = attempt.attemptValue;
    attemptInfo.maxAttempts = QuestionsConstants.maxAttempts;
    if (attemptValue >= 1) {
      attemptInfo.clueOne = {
        Year: question["PeopleQuestion.clueNationality"]
      };
      response.allResponses = [attempt.firstAttempt];
    }

    if (attemptValue >= 2) {
      attemptInfo.clueTwo = {
        Director: question["PeopleQuestion.clueLifespan"]
      };
      response.allResponses = [attempt.firstAttempt, attempt.secondAttempt];
    }

    if (attemptValue >= 3) {
      attemptInfo.clueThree = {
        Cast: question["PeopleQuestion.clueInitials"]
      };
      response.allResponses = [
        attempt.firstAttempt,
        attempt.secondAttempt,
        attempt.thirdAttempt
      ];
    }
    if (attemptInfo.isCorrect || attemptValue == 4) {
      response.answer = question["PeopleQuestion.personName"];
      response.clueMainAfter = question.clueMainAfter;
      attemptInfo.clueOne = {
        Year: question["PeopleQuestion.clueNationality"]
      };
      attemptInfo.clueTwo = {
        Director: question["PeopleQuestion.clueLifespan"]
      };
      attemptInfo.clueThree = {
        Cast: question["PeopleQuestion.clueInitials"]
      };
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
      wikiLink: question["PeopleQuestion.wikiLink"],
      clueImage: question.clueImage,
      attemptsInfo: attemptInfo
    };
    return response;
  }
}

module.exports = PeopleQuestion;
