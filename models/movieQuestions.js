const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");

const MovieQuestion = sequelize.define(
  "MovieQuestion",
  {
    movieName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    clueDirector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueCast: {
      type: DataTypes.JSON,
      allowNull: false
    },
    imdbLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quesID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Questions",
        key: "id"
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = MovieQuestion;
