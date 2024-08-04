const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const tokenRoutes = require("./routes/token");
const dotenv = require("dotenv").config();
const path = require("path");
const db = require("./databaseConfig/dbconfig");
const userRoutes = require("./routes/user");
const association = require("./models/associations/associations");
const questionRoutes = require("./routes/question");
const Utils = require("./utils/utils");
const UserServices = require("./services/user");

const app = express();
const PORT = 8080;

//json parser
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//routes
app.use("/images", express.static("images"));
app.use(userRoutes);
app.use(questionRoutes);
app.use(tokenRoutes);
//error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  if (status === 500) {
    message = "Something went wrong!";
  }
  res.status(status).json({
    message: message,
    statusCode: status,
  });
});

app.get("/", (req, res) => {
  res.send(`server running on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
