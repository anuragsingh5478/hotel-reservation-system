const UserAuth = require("../models/userAuthenticationModel");

exports.user_list = function (req, res) {
  UserAuth.find((err, users) => {
    if (err) console.log(err);
    res.json(users);
  });
};

exports.user_details = function (req, res) {
  let userId = req.user_id;
  UserAuth.findById(userId)
    .then((user) => {
      let userData = removeSensitiveInfo(user);
      res.json({ msg: "success", userData: userData });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.edit_user = function (req, res) {
  let userId = req.user_id;
  let userDetails = req.body;
  UserAuth.findById(userId).then((user) => {
    user.name = userDetails.name;
    user.gender = userDetails.gender;

    user
      .save()
      .then(() => res.json({ msg: "success" }))
      .catch((err) => res.status(400).json({ msg: "Error: " + err }));
  });
};

// Utillity functions
function removeSensitiveInfo(data) {
  const userData = {
    name: data.name,
    email: data.email,
    gender: data.gender,
  };
  return userData;
}
