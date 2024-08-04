const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");
const Sequelize = require("sequelize");

const QuestionStatsForUnregisteredUser = sequelize.define(
  "QuestionStatsForUnregisteredUser",
  {
    attemptsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    correctValues: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    correctAtFirstAttempt:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    correctAtSecondAttempt:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    correctAtThirdAttempt:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    correctAtFourthAttempt:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
  }
);

module.exports = QuestionStatsForUnregisteredUser;
