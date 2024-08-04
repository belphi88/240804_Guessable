const express = require("express");
const router = express.Router();
const { body, check } = require("express-validator");
const {
  getQuestion,
  makeAttempt,
  getQuestionStats,
  getQuestionByDate,
  getQuestionForUnregisteredUser,
  makeAttemptForUnregisteredUser,
  makeAttemptForOldQuestion,
  getQuestionTypeStatsByUser,
} = require("../controllers/question");
const { QuestionsConstants } = require("../utils/constants");
const auth = require("../middlewares/auth");

// Route to get the question for the current day
router.get("/questionForTheDay/:questionType/", auth, getQuestion);

// Route to make an attempt on a question
router.put(
  "/makeAttempt",
  // Validate the question type
  body("questionType").custom((value) => {
    if (
      value !== QuestionsConstants.COUNTRY &&
      value !== QuestionsConstants.MOVIE && 
      value !== QuestionsConstants.PEOPLE
    ) {
      throw new Error(
        'Question type is not valid; it should be either "country" or "movie"'
      );
    }
    return true;
  }),
  auth, // Authentication middleware
  makeAttempt // Controller function to handle the attempt
);

// Route to get question statistics
router.get("/questionStats/:questionId", getQuestionStats);

// Route to get a question by date (specific or random)
router.get("/questionByDate/:questionType/:date/:userID", getQuestionByDate);

// Route to get a question in unregistered mode for the current date only
router.get(
  "/getQuestionForUnregisteredUser/:questionType/:userID",
  getQuestionForUnregisteredUser
);

// Route to make an attempt in unregistered mode
router.put("/makeAttemptForUnregisteredUser", makeAttemptForUnregisteredUser);

// Route to make an attempt for an old question
router.put("/makeAttemptForOldQuestion", makeAttemptForOldQuestion);
// Route to get stats for questionType by specific user
router.get("/getStats/:questionType/:userID",getQuestionTypeStatsByUser);

module.exports = router;
