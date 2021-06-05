const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
  email: String,
  password: String,
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);
module.exports = UserAuth;
