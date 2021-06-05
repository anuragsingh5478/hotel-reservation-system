const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  phone: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
