const Attempt = require("../services/attempt");
const Question = require("../services/question");
const Utils = require("../utils/utils");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.getQuestion = async (req, res, next) => {
  try {
    console.log("Requested to /question with params: " + req.params);
    const userId = req.user.id;
    const date = Utils.getCurrentDate();
    const questionType = req.params.questionType;
    const question = Utils.getInstance(questionType);
    const fetchedQues = await question.getQuestion(date, userId);
    res.status(200).json(fetchedQues);
    console.log(fetchedQues);
  } catch (err) {
    next(err);
  }
};

exports.makeAttempt = async (req, res, next) => {
  console.log("Requested to /makeAttempt with body: " + req.body);
  try {
    const { attemptDataId, chooseValue, questionType } = req.body;

    const response = await Attempt.makeAttempt({
      attemptDataId,
      chooseValue,
      questionType,
      isRegistered: true,
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.makeAttemptForUnregisteredUser = async (req, res, next) => {
  console.log(
    "Requested to /makeAttemptForUnregisteredUser with body: " + req.body
  );
  try {
    const { attemptData, chooseValue, questionType, userID, attemptDataId } =
      req.body;

    const response = await Attempt.makeAttempt({
      chooseValue,
      questionType,
      isRegistered: false,
      attemptData,
      attemptDataId,
      userID
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getQuestionStats = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const stats1 = await Question.getQuestionStats(questionId);
    const stats2 = await Question.getQuestionStatsForUnregisteredAttempts(questionId);
    let response;
    if(stats1 && stats2) {
    response = Question.combineResponses(stats1, stats2);

    } else if (stats1) {
      response = stats1;
    } else {
      response = stats2;
    }
    res.status(200).json({
      response,
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionByDate = async (req, res, next) => {
  try {
    const { date, questionType, userID } = req.params;
    // const isRegistered = req.query.registered === "true";
    const isRegistered = userID == "auth" ? true : false
    let userId;
    if(userID == "auth") {
      const authHeader = req.get("Authorization");
      const token = authHeader.split(" ")[1];
      let decodedToken;
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findOne({ where: { userId: decodedToken.userId } });
      // userId = req.query.userId;
      userId = user.userId;
    } else {
      userId = userID;
    }
    const questionIns = Utils.getInstance(questionType);
    console.log(date, userId, isRegistered);
    const response = await questionIns.getQuestionByDate(
      date,
      userId,
      isRegistered
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.getQuestionForUnregisteredUser = async (req, res, next) => {
  try {
    const { questionType, userID } = req.params;
    const date = Utils.getCurrentDate();
    const questionIns = Utils.getInstance(questionType);
    console.log(" getQuestionForUnregisteredUser userID ", userID);
    const response = await questionIns.getQuestionForUnregisteredUser(
      date,
      userID
    );
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.makeAttemptForOldQuestion = async (req, res, next) => {
  console.log("Requested to /makeAttemptForOldQuestion with body: " + req.body);
  try {
    const { attemptData, attemptDataId	, chooseValue, questionType, userID } = req.body;

    const response = await Attempt.makeAttempt({
      chooseValue,
      questionType,
      isRegistered: userID == "auth" ? true : false,
      attemptData,
      attemptDataId,
      userID,
      oldQuestionAttempt : true
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getQuestionTypeStatsByUser = async (req, res, next) => {
  try {
    const { questionType, userID } = req.params;
    // const userId = req.user.id;
    let userId;
    let isAuth;
    if (userID == "auth") {
      isAuth = true;
      const authHeader = req.get("Authorization");
      const token = authHeader.split(" ")[1];
      let decodedToken;
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findOne({
        where: { userId: decodedToken.userId }
      });
      // userId = req.query.userId;
      userId = user.userId;
    } else {
      isAuth = false;
      userId = userID;
    }
    const type = questionType;
    const question = Utils.getInstance(type);
    const questionTypeStats = await question.questionTypeStats(userId, isAuth);
    res.status(200).json(questionTypeStats);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
