const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");

const CountryQuestion = sequelize.define(
  "CountryQuestion",
  {
    countryName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueLatLong: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueFlag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueCapital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wikiLink: {
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

module.exports = CountryQuestion;
