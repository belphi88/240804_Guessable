const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * Authorization middleware, returns error if a token is not provided
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const error = new Error("Not authenticated");
      error.statusCode = 403;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      error.statusCode = 403;
      throw error;
    }
    let user = await User.findOne({ where: { userId: decodedToken.userId } });
    if (!user) {
      const error = new Error("Not authenticated.");
      error.statusCode = 403;
      throw error;
    } else {
      user = user.dataValues;
      console.info(`Request made by ${user.userId}`);
      req.user = { id: user.userId, address: user.email || null };
    }
  } catch (err) {
    err.statusCode = 403;
    next(err);
  }

  next();
};
