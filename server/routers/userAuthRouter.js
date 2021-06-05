const express = require("express");
const router = express.Router();

var userAuthController = require("../controllers/useAuthenticationController");

router.post("/signup", userAuthController.signUp);

router.post("/login", userAuthController.login);

module.exports = router;
