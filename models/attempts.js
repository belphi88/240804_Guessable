const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");

const Attempt = sequelize.define(
  "Attempt",
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId"
      }
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
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["quesID", "userID"]
      }
    ]
  }
);

module.exports = Attempt;
