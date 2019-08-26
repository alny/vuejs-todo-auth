const express = require("express");
const chalk = require("chalk");

require("./models/user");
require("./config/database");
require("./services/passport");
const middlewaresConfig = require("./config/middlewares");
const constants = require("./config/constants");
const ApiRoutes = require("./routes");

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use("/api", ApiRoutes);
app.get("/", (req, res) => {
  res.send(`
    <div style="position: absolute; top:0; bottom: 0; left: 0; right: 0; margin: auto; width: 350px;height: 350px;">
      <h4>Welcome to the REST API</h4>
    </div>
  `);
});

app.listen(constants.PORT, err => {
  if (err) {
    console.log(chalk.red("Cannot run!"));
  } else {
    console.log(
      chalk.green.bold(
        `
        Server running... Cheers! 🍺
        REST API on port: ${constants.PORT} 🍕
        Environment: ${constants.NODE_ENV} 🦄
      `
      )
    );
  }
});

module.exports = app;
