const { DataTypes } = require("sequelize");
const sequelize = require("../databaseConfig/dbconfig");
const Sequelize = require("sequelize");
const { SERVER_UTC } = require("../utils/constants");
// Define the User model
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: "User"
  },
  oAuthProvider: {
    type: DataTypes.STRING,
    allowNull: true
  },
  oAuthId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  additionalData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  countryStreak: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  movieStreak: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  peopleStreak: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  timeZone: {
    type: DataTypes.STRING,
    defaultValue: SERVER_UTC
  },
  maxStreak: {
    type: DataTypes.JSON,
    defaultValue: {
      countryStreak: 0,
      movieStreak: 0,
      peopleStreak: 0
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  }
});

// Export the User model
module.exports = User;
