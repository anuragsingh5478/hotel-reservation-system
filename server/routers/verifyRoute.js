const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.token;
  // const token = req.body.token || req.params.token;
  if (!token) return res.send({ msg: "Access Denied" }); //status code 401

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user_id = verified; //payload is returned
    next();
  } catch (err) {
    res.send({ msg: "Invalid Token" }); //.status(400).
  }
};
