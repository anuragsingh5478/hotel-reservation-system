const User = require("../models/userModel");

exports.user_list = function (req, res) {
  User.find((err, users) => {
    if (err) console.log(err);
    res.json(users);
  });
};

exports.user_details = function (req, res) {
  let userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.create_user = function (req, res) {
  const userDetails = req.body;

  let newUser = new User({
    _id: Object(userDetails._id),
    name: userDetails.name,
    phone: userDetails.phone,
    gender: userDetails.gender,
  });

  newUser
    .save()
    .then((user) => {
      res.json({ msg: "success", user_id: user._id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.edit_user = function (req, res) {
  //console.log("in edit user");
  let userId = req.params.userId;
  let userDetails = req.body;
  User.findById(userId).then((user) => {
    user.name = userDetails.name;
    user.phone = userDetails.phone;
    user.gender = userDetails.gender;

    user
      .save()
      .then(() => res.json({ msg: "User updated!" }))
      .catch((err) => res.status(400).json({ msg: "Error: " + err }));
  });
};
