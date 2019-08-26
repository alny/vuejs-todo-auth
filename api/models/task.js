const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.String,
    ref: "UserSchema"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TaskSchema", TaskSchema);
