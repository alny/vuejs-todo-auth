const Router = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
const UserController = require("../controllers/userController");

const routes = new Router();

routes.get("/:id", UserController.getById);
routes.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    const body = { _id: req.user._id, username: req.user.username };
    const token = jwt.sign({ user: body }, constants.JWT_SECRET);
    return res.json({ token });
  }
);

routes.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) return res.json({ token: null });
      if (err) {
        const error = new Error("An Error occured");
        return next(error);
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the username and id
        const body = { _id: user._id, username: user.username };
        //Sign the JWT token and populate the payload with the user username and id
        const token = jwt.sign({ user: body }, constants.JWT_SECRET);
        //Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = routes;
