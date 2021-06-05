const bcrypt = require("bcrypt");
const UserAuth = require("../models/userAuthenticationModel");

exports.signUp = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    var newUser = new UserAuth({
      email: req.body.email,
      password: hashedPassword,
    });
    console.log("new user:");
    console.log(newUser);
    newUser
      .save()
      .then((user) => {
        res.json({ msg: "success", user_id: user._id });
      })
      .catch((err) => {
        console.log(err);
      });

    // res.status(201).send();
  } catch {
    res.status(500).send();
  }
};

exports.login = function (req, res) {
  console.log(req.body);
  UserAuth.findOne({ email: req.body.email }, async (err, user) => {
    if (user == null) {
      res.json({ msg: "User Not Found", user_id: null });
    }
    try {
      //console.log(user);
      var match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.json({ msg: "success", user_id: user._id });
      } else {
        res.json({ msg: "Incorrect Password", user_id: null });
      }
    } catch {
      res.status(500).send();
    }
  });
};
