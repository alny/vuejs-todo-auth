const HTTPStatus = require("http-status");
const User = require("../models/user");

const getById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  try {
    return res.status(HTTPStatus.OK).json({
      user
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById
};
