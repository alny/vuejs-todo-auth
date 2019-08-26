const passport = require("passport");
const Router = require("express");

const TaskRoutes = require("./taskRoute");
const UserRoutes = require("./userRoute");

const routes = new Router();

routes.use(
  "/task",
  passport.authenticate("jwt", { session: false }),
  TaskRoutes
);
routes.use("/user", UserRoutes);

module.exports = routes;
