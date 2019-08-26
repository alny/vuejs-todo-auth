require("dotenv").config();

const defaultConfig = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: "development"
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL
};

module.exports = {
  ...defaultConfig,
  ...devConfig
};
