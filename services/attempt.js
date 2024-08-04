const AttemptModel = require("../models/attempts");
const CountryQuestion = require("../models/countryQuestions");
const MovieQuestion = require("../models/movieQuestions");
const QuestionModel = require("../models/questions");
const User = require("../models/user");
const QuestionStats = require("../models/questionStats");
const UnregisteredAttemptModel = require("../models/unregisteredAttempts");

const { QuestionsConstants } = require("../utils/constants");
const Utils = require("../utils/utils");
const UserServices = require("./user");

class Attempt {
  static async makeAttempt({
    attemptDataId,
    chooseValue,
    questionType,
    attemptData,
    isRegistered,
    userID,
    oldQuestionAttempt = false,
  }) {
    let attempt;
    if (isRegistered) {
      attempt = await AttemptModel.findOne({
        include: [
          {
            model: QuestionModel,
            required: true,
          },
        ],
        where: {
          id: attemptDataId,
        },
        raw: true,
      });

      if (!attempt) {
        const error = new Error(
          "Bad argument: Could not find the attempt data for id: " +
            attemptDataId
        );
        error.statusCode = 404;
        throw error;
      }
      let restructuredAttempt = {
        id: attempt.id,
        attemptValue: attempt.attemptValue,
        isCorrect: attempt.isCorrect,
        quesID: attempt.quesID,
        userID: attempt.userID,
        question: {
          id: attempt["Question.id"],
          date: attempt["Question.date"],
          clueMainBefore: attempt["Question.clueMainBefore"],
          clueImage: attempt["Question.clueImage"],
          clueMainAfter: attempt["Question.clueMainAfter"]
        },
        firstAttempt: attempt.firstAttempt,
        secondAttempt: attempt.secondAttempt,
        thirdAttempt: attempt.thirdAttempt,
        fourthAttempt: attempt.fourthAttempt
      };
      attempt = restructuredAttempt;
    } else {
      // attempt = attemptData;
      // attempt.userID = userID;
      // const questionForGivenAttempt = await QuestionModel.findOne({
      //   where: {
      //     id: attempt.quesID
      //   },
      //   raw: true
      // });
      // attempt.question = questionForGivenAttempt;
      attempt = await UnregisteredAttemptModel.findOne({
        include: [
          {
            model: QuestionModel,
            required: true
          }
        ],
        where: {
          id: attemptDataId
        },
        raw: true
      });

      if (!attempt) {
        const error = new Error(
          "Bad argument: Could not find the attempt data for id: " +
            attemptDataId
        );
        error.statusCode = 404;
        throw error;
      }
      let restructuredAttempt = {
        id: attempt.id,
        attemptValue: attempt.attemptValue,
        isCorrect: attempt.isCorrect,
        quesID: attempt.quesID,
        userID: attempt.userID,
        question: {
          id: attempt["Question.id"],
          date: attempt["Question.date"],
          clueMainBefore: attempt["Question.clueMainBefore"],
          clueImage: attempt["Question.clueImage"],
          clueMainAfter: attempt["Question.clueMainAfter"]
        },
        firstAttempt: attempt.firstAttempt,
        secondAttempt: attempt.secondAttempt,
        thirdAttempt: attempt.thirdAttempt,
        fourthAttempt: attempt.fourthAttempt
      };
      attempt = restructuredAttempt;
    }

    if (attempt.isCorrect) {
      const error = new Error(
        "This question has already been answered correctly"
      );
      error.statusCode = 409;
      throw error;
    }

    if (attempt.attemptValue >= QuestionsConstants.maxAttempts) {
      const error = new Error("Attempts limit reached");
      error.statusCode = 429;
      throw error;
    }
    const subQuestionType = Utils.getInstance(questionType);
    const questionData = await subQuestionType.getQuestionById(
      attempt.question.id
    );
    if (!questionData) {
      const error = new Error(
        `Question not found, please verify the payload is correct: { attemptDataId: ${attemptDataId}, chooseValue: ${chooseValue}, questionType: ${questionType}}`
      );
      error.statusCode = 404;
      throw error;
    }
    questionData.clueMainAfter = attempt.question.clueMainAfter;
    let truthValue;
    var response = {};
    let updatedAttempt = attempt;
    if (questionType === QuestionsConstants.COUNTRY) {
      truthValue = questionData.countryName;
    } else if (questionType === QuestionsConstants.MOVIE) {
      truthValue = questionData.movieName;
    } else if (questionType === QuestionsConstants.PEOPLE) {
      truthValue = questionData.personName;
    }

    if (truthValue !== chooseValue.trim()) {
      response.isCorrect = false;
      if (attempt.attemptValue) {
        attempt.attemptValue = parseInt(attempt.attemptValue);
      } else {
        attempt.attemptValue = 0;
      }
      if (attempt.attemptValue == QuestionsConstants.maxAttempts - 1) {
        console.info("Final attempt failed too");
        updatedAttempt.attemptValue = 4;
        response.answer =
          questionType === QuestionsConstants.COUNTRY
            ? questionData.countryName
            : questionType === QuestionsConstants.MOVIE
            ? questionData.movieName : questionData.personName;
        updatedAttempt.fourthAttempt = chooseValue;
        response.clueMainAfter = questionData.clueMainAfter;
        if (isRegistered) {
          console.info("user is registered and we are updating streak");
          const obj =
            questionType === QuestionsConstants.COUNTRY
              ? { countryStreak: 0 }
              : questionType === QuestionsConstants.MOVIE
              ? { movieStreak: 0 }
              : { peopleStreak: 0 };

          obj.userId = attempt.userID;

          await UserServices.setStreaks(obj);
        }
      } else if (attempt.attemptValue == 0) {
        updatedAttempt.attemptValue = 1;
        response.clueOne =
          questionType === QuestionsConstants.COUNTRY
            ? { LatLong: questionData.clueLatLong }
            : questionType === QuestionsConstants.MOVIE
            ? { releaseYear: questionData.clueYear }
            : { nationality: questionData.clueNationality };
        updatedAttempt.firstAttempt = chooseValue;
      } else if (attempt.attemptValue == 1) {
        updatedAttempt.attemptValue = 2;
        response.clueTwo =
          questionType === QuestionsConstants.COUNTRY
            ? { flag: questionData.clueFlag }
            : questionType === QuestionsConstants.MOVIE
            ? { cast: questionData.clueCast }
            : { lifespan: questionData.clueLifespan };
        updatedAttempt.secondAttempt = chooseValue;
      } else if (attempt.attemptValue == 2) {
        updatedAttempt.attemptValue = 3;
        response.clueThree =
          questionType === QuestionsConstants.COUNTRY
            ? { capital: questionData.clueCapital }
            : questionType === QuestionsConstants.MOVIE
            ? { director: questionData.clueDirector }
            : { initials: questionData.clueInitials };
        updatedAttempt.thirdAttempt = chooseValue;
      }
      if (isRegistered) {
        await AttemptModel.update(
          {
            attemptValue: updatedAttempt.attemptValue,
            firstAttempt: updatedAttempt?.firstAttempt || null,
            secondAttempt: updatedAttempt?.secondAttempt || null,
            thirdAttempt: updatedAttempt?.thirdAttempt || null,
            fourthAttempt: updatedAttempt?.fourthAttempt || null
          },
          {
            where: { id: attemptDataId }
          }
        );
      } else {
        const [record, created] = await UnregisteredAttemptModel.findOrCreate({
          where: {
            quesID: updatedAttempt.quesID,
            userID: updatedAttempt.userID
          },
          defaults: {
            attemptValue: updatedAttempt.attemptValue,
            isCorrect: updatedAttempt.isCorrect,
            quesID: updatedAttempt.quesID,
            userID: updatedAttempt.userID,
            firstAttempt: updatedAttempt?.firstAttempt || null,
            secondAttempt: updatedAttempt?.secondAttempt || null,
            thirdAttempt: updatedAttempt?.thirdAttempt || null,
            fourthAttempt: updatedAttempt?.fourthAttempt || null
          }
        });

        if (!created) {
          await record.update({
            attemptValue: updatedAttempt.attemptValue,
            isCorrect: updatedAttempt.isCorrect,
            firstAttempt: updatedAttempt?.firstAttempt || record.firstAttempt,
            secondAttempt:
              updatedAttempt?.secondAttempt || record.secondAttempt,
            thirdAttempt: updatedAttempt?.thirdAttempt || record.thirdAttempt,
            fourthAttempt: updatedAttempt?.fourthAttempt || record.fourthAttempt
          });
        }
      }
    } else if (isRegistered && truthValue == chooseValue.trim()) {
      console.info(
        "Answer is correct and user is registered, now updating streak and stats"
      );
      if(!oldQuestionAttempt){
      await UserServices.updateStreak(true, attempt.userID, questionType);
      }
      updatedAttempt.attemptValue++;
      if (attempt.attemptValue) {
        attempt.attemptValue = parseInt(attempt.attemptValue);
      } else {
        attempt.attemptValue = 0;
      }

      if (attempt.attemptValue == 4) {
        updatedAttempt.fourthAttempt = chooseValue;
      } else if (attempt.attemptValue == 1) {
        updatedAttempt.firstAttempt = chooseValue;
      } else if (attempt.attemptValue == 2) {
        updatedAttempt.secondAttempt = chooseValue;
      } else if (attempt.attemptValue == 3) {
        updatedAttempt.thirdAttempt = chooseValue;
      }
      await AttemptModel.update(
        {
          attemptValue: updatedAttempt.attemptValue,
          isCorrect: true,
          firstAttempt: updatedAttempt?.firstAttempt || null,
          secondAttempt: updatedAttempt?.secondAttempt || null,
          thirdAttempt: updatedAttempt?.thirdAttempt || null,
          fourthAttempt: updatedAttempt?.fourthAttempt || null
        },
        {
          where: { id: attemptDataId }
        }
      );
      await UserServices.scheduleJob(attempt.userID, questionType);
      response = await this.postCorrectAnswer(
        questionType,
        questionData,
        attempt.attemptValue
      );
      response.attemptNumber = updatedAttempt.attemptValue;
      response.allResponses = [
        attempt.firstAttempt,
        attempt.secondAttempt,
        attempt.thirdAttempt,
        attempt.fourthAttempt
      ]; 
      return response;
    } else {
      updatedAttempt.attemptValue = updatedAttempt.attemptValue + 1;

      if (updatedAttempt.attemptValue === 1) {
        updatedAttempt.firstAttempt = chooseValue;
      } else if (updatedAttempt.attemptValue === 2) {
        updatedAttempt.secondAttempt = chooseValue;
      } else if (updatedAttempt.attemptValue === 3) {
        updatedAttempt.thirdAttempt = chooseValue;
      } else if (updatedAttempt.attemptValue === 4) {
        updatedAttempt.fourthAttempt = chooseValue;
      }

      const [record, created] = await UnregisteredAttemptModel.findOrCreate({
        where: {
          quesID: updatedAttempt.quesID,
          userID: updatedAttempt.userID
        },
        defaults: {
          attemptValue: updatedAttempt.attemptValue,
          isCorrect: true,
          quesID: updatedAttempt.quesID,
          userID: updatedAttempt.userID,
          firstAttempt: updatedAttempt?.firstAttempt || null,
          secondAttempt: updatedAttempt?.secondAttempt || null,
          thirdAttempt: updatedAttempt?.thirdAttempt || null,
          fourthAttempt: updatedAttempt?.fourthAttempt || null
        }
      });

      if (!created) {
        await record.update({
          attemptValue: updatedAttempt.attemptValue,
          isCorrect: true,
          firstAttempt: updatedAttempt?.firstAttempt || record.firstAttempt,
          secondAttempt: updatedAttempt?.secondAttempt || record.secondAttempt,
          thirdAttempt: updatedAttempt?.thirdAttempt || record.thirdAttempt,
          fourthAttempt: updatedAttempt?.fourthAttempt || record.fourthAttempt
        });
      }

      // const [record, created] = await QuestionStats.findOrCreate({
      //   where: { quesID: questionData.quesID },
      //   defaults: { quesID: questionData.quesID }
      // });

      // await record.increment("correctValues", { by: 1 });
      // if (updatedAttempt.attemptValue === 1) {
      //   await record.increment("attemptsCount", { by: 1 });
      //   await record.increment("correctAtFirstAttempt", { by: 1 });
      // } else if (updatedAttempt.attemptValue === 2) {
      //   await record.increment("correctAtSecondAttempt", { by: 1 });
      // } else if (updatedAttempt.attemptValue === 3) {
      //   await record.increment("correctAtThirdAttempt", { by: 1 });
      // } else if (updatedAttempt.attemptValue === 4) {
      //   await record.increment("correctAtFourthAttempt", { by: 1 });
      // }

      response = await this.postCorrectAnswer(
        questionType,
        questionData,
        attempt.attemptValue
      );
      response.clueMainAfter = questionData.clueMainAfter;
      response.attemptNumber = updatedAttempt.attemptValue;
      // console.info(response);
      response.allResponses = [
        attempt.firstAttempt,
        attempt.secondAttempt,
        attempt.thirdAttempt,
        attempt.fourthAttempt
      ]; 
      return response;
    }
    response.attemptNumber = updatedAttempt.attemptValue
    return response;
  }

  static async postCorrectAnswer(questionType, questionData, attemptValue) {
    var response = {};
    attemptValue = parseInt(attemptValue) + 1;
    const isCorrect = true;

    response.isCorrect = true;
    response.clueMainAfter = questionData.clueMainAfter;
    response.answer =
      questionType === QuestionsConstants.COUNTRY
        ? questionData.countryName
        : questionType === QuestionsConstants.MOVIE
        ? questionData.movieName
        : questionData.personName;
    response.clueOne =
      questionType === QuestionsConstants.COUNTRY
        ? { LatLong: questionData.clueLatLong }
        : questionType === QuestionsConstants.MOVIE
        ? { releaseYear: questionData.clueYear }
        : { nationality: questionData.clueNationality };
    response.clueTwo =
      questionType === QuestionsConstants.COUNTRY
        ? { flag: questionData.clueFlag }
        : questionType === QuestionsConstants.MOVIE
        ? { cast: questionData.clueCast }
        : { lifespan: questionData.clueLifespan };

    response.clueThree =
      questionType === QuestionsConstants.COUNTRY
        ? { capital: questionData.clueCapital }
        : questionType === QuestionsConstants.MOVIE
        ? { director: questionData.clueDirector }
        : { initials: questionData.clueInitials };
    response.clueMainAfter = questionData.clueMainAfter;

    return response;
  }

  static async hasAnswered(userId) {
    const date = Utils.getCurrentDate();
    const countryQuestionModel = Utils.getInstance(QuestionsConstants.COUNTRY);
    const movieQuestionModel = Utils.getInstance(QuestionsConstants.MOVIE);

    const countryQuestion = await QuestionModel.findOne({
      where: {
        date: date
      },
      include: [
        {
          model: CountryQuestion,
          require: true
        }
      ],
      raw: true
    });

    const movieQuestion = await QuestionModel.findOne({
      where: {
        date: date
      },
      include: [
        {
          model: MovieQuestion,
          require: true
        }
      ],
      raw: true
    });

    if (!countryQuestion || !movieQuestion) {
      const error = new Error(`Question not found for todays date: ${date}`);
      error.statusCode = 404;
      throw error;
    }

    const countryAttempt = await AttemptModel.findOne({
      where: {
        quesID: countryQuestion.id,
        userID: userId
      },
      raw: true
    });

    const movieAttempt = await AttemptModel.findOne({
      where: {
        quesID: movieQuestion.id,
        userID: userId
      },
      raw: true
    });

    if (!countryAttempt || !movieAttempt) {
      const error = new Error(
        `Attempt not found for question with date: ${date} and user Id ${userId} thus not updating`
      );
      error.statusCode = 404;
      throw error;
    }

    return {
      isCountryQuestionAttempted: countryAttempt.isCorrect,
      isMovieQuestionAttempted: movieAttempt.isCorrect
    };
  }

  static async saveAttemptData(attemptDataArr, userId) {
    const attempts = attemptDataArr.map((attempt) => ({
      attemptValue: attempt.attemptValue,
      isCorrect: attempt.isCorrect,
      quesID: attempt.quesID,
      userID: userId,
      firstAttempt: attempt.firstAttempt,
      secondAttempt: attempt.secondAttempt,
      thirdAttempt: attempt.thirdAttempt,
      fourthAttempt: attempt.fourthAttempt
    }));

    await AttemptModel.bulkCreate(attempts);
  }
  static async saveOrUpdateAttemptData(unregisteredAttempt, userId) {
    const existingAttempt = await AttemptModel.findOne({
      where: {
        quesID: unregisteredAttempt.quesID,
        userID: userId
      }
    });

  if (existingAttempt) {
    // Update the existing attempt
    await existingAttempt.update({
      attemptValue: unregisteredAttempt.attemptValue,
      isCorrect: unregisteredAttempt.isCorrect,
      firstAttempt: unregisteredAttempt.firstAttempt,
      secondAttempt: unregisteredAttempt.secondAttempt,
      thirdAttempt: unregisteredAttempt.thirdAttempt,
      fourthAttempt: unregisteredAttempt.fourthAttempt
    });
  } else {
    // Create a new attempt
    await AttemptModel.create({
      quesID: unregisteredAttempt.quesID,
      userID: userId,
      attemptValue: unregisteredAttempt.attemptValue,
      isCorrect: unregisteredAttempt.isCorrect,
      firstAttempt: unregisteredAttempt.firstAttempt,
      secondAttempt: unregisteredAttempt.secondAttempt,
      thirdAttempt: unregisteredAttempt.thirdAttempt,
      fourthAttempt: unregisteredAttempt.fourthAttempt
    });
  }
  }
}

module.exports = Attempt;
