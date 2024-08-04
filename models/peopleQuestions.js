const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");

const PeopleQuestion = sequelize.define(
  "PeopleQuestion",
  {
    personName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueNationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueLifespan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clueInitials: {
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

module.exports = PeopleQuestion;
