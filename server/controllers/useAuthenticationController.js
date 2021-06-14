const bcrypt = require("bcrypt");
const UserAuth = require("../models/userAuthenticationModel");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

exports.signUp = async function (req, res) {
  // Validation
  const { error, value } = registerValidation(req.body);
  if (error) return res.send({ msg: error.details[0].message });

  // Checking if User's Email Already in the Database
  const emailExist = await UserAuth.findOne({ email: req.body.email });
  if (emailExist) return res.send({ msg: "email already in use" });

  //Hash the password
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRound);

  // Creating new User
  const user = new UserAuth({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
  });

  try {
    const savedUser = await user.save();
    // Create and Assign a Token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.send({ msg: "success", token: token });
  } catch (err) {
    res.send({ msg: err });
  }
};

exports.login = async function (req, res) {
  // Validation
  const { error, value } = loginValidation(req.body);
  if (error) return res.send({ msg: error.details[0].message });

  // Checking if User's Email Already in the Database
  const user = await UserAuth.findOne({ email: req.body.email });
  if (!user) return res.send({ msg: "email does not exist" });

  // Check if Password is Correct
  const validPass = await bcrypt
    .compare(req.body.password, user.password)
    .catch((err) => res.status(400).send(err));
  if (!validPass) return res.send({ msg: "email and password does not match" });

  // Create and Assign a Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({ msg: "success", token: token });
};
