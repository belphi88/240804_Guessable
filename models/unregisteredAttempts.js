const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");

const UnregisteredAttempt = sequelize.define(
  "UnregisteredAttempt",
  {
    attemptValue: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    quesID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Questions",
        key: "id"
      }
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstAttempt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secondAttempt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thirdAttempt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fourthAttempt: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = UnregisteredAttempt;
