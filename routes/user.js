const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const { body, check } = require("express-validator");
const auth = require("../middlewares/auth");

router.post(
  "/signup",
  [
    body("email", "Invalid email address")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password should be at least of length 8")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  UserController.signup
);
router.post(
  "/signin",
  [
    body("email", "Invalid email address")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
  ],
  UserController.signin
);

router.post("/signin-oauth", UserController.signInWithOAuth);
router.post("/signupWithGameData", UserController.signupWithGameData);
router.get("/getStreaks", auth, UserController.getStreaks);
router.get("/getAllCountries", UserController.getAllCountries);
router.get("/getAllMovies", UserController.getAllMovies);
router.get("/getAllPeople", UserController.getAllPeople);

router.post("/add-questions", UserController.addQuestions);
module.exports = router;
