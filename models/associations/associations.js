const Question = require("../questions");
const CountryQuestion = require("../countryQuestions");
const MovieQuestion = require("../movieQuestions");
const PeopleQuestion = require("../peopleQuestions");
const User = require("../user");
const Attempt = require("../attempts");
const UnregisteredAttempt = require("../unregisteredAttempts"); 
const db = require("../../databaseConfig/dbconfig");
const QuestionStatsForUnregisteredUser = require("../questionStats");

// CountryQuestion association with Question
CountryQuestion.belongsTo(Question, {
  foreignKey: "quesID",
  constraints: false,
});

// MovieQuestion association with Question
MovieQuestion.belongsTo(Question, {
  foreignKey: "quesID",
  constraints: false,
});

PeopleQuestion.belongsTo(Question, {
  foreignKey: "quesID",
  constraints: false
});

// Question association with CountryQuestion
Question.hasOne(CountryQuestion, {
  foreignKey: "quesID",
  constraints: false,
});

// Question association with MovieQuestion
Question.hasOne(MovieQuestion, {
  foreignKey: "quesID",
  constraints: false,
});

Question.hasOne(PeopleQuestion, {
  foreignKey: "quesID",
  constraints: false
});

Question.hasMany(Attempt, { foreignKey: "quesID" });
Attempt.belongsTo(Question, { foreignKey: "quesID" });

User.hasMany(Attempt, { foreignKey: "userID" });
Attempt.belongsTo(User, { foreignKey: "userID" });

Question.hasMany(UnregisteredAttempt, { foreignKey: "quesID" });
UnregisteredAttempt.belongsTo(Question, { foreignKey: "quesID" });

QuestionStatsForUnregisteredUser.belongsTo(Question, {
  foreignKey: "quesID",
  constraints: false,
});
