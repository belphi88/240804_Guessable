const Sequelize = require("sequelize");
require("dotenv").config();
const { SERVER_UTC, LOCAL_UTC } = require("../utils/constants");

const args = process.argv;
console.log("Arguments:", args);
// var ENV;
// if (args.length > 2) {
//   ENV = args[2];
//   console.info("Environment provided :" + ENV);
// } else {
//   ENV = "LOCAL";
//   console.info("No environment provided, using default :" + ENV);
// }
var ENV = "local";
const config = {
  local: {
    username: process.env.DB_USERNAME_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    database: process.env.DB_DATABASE_LOCAL,
    host: process.env.DB_HOST_LOCAL,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    timezone: LOCAL_UTC,
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    timezone: SERVER_UTC,
  },
};

const sequelize = new Sequelize(
  config[ENV].database,
  config[ENV].username,
  config[ENV].password,
  {
    host: config[ENV].host,
    dialect: config[ENV].dialect,
    port: config[ENV].port,
  }
);

// Authenticate and create the database if it doesn't exist
sequelize
  .authenticate()
  .then(async () => {
    console.log("Connection has been established successfully.");

    // Run a query to create the database if it does not exist
    await sequelize.query(
      `CREATE DATABASE IF NOT EXISTS ${config[ENV].database};`
    );
    console.log("Database created or already exists.");

    // Synchronize the model with the database
    await sequelize.sync({ alter: false, drop: false });
    console.log("Models synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
