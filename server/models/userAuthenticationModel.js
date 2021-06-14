const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
  email: String,
  password: String,
  name: String,
  gender: String,
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);
module.exports = UserAuth;
