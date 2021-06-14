const express = require("express");
const router = express.Router();

var userController = require("../controllers/userController");

const verifyRoute = require("./verifyRoute");

router.get("/list", verifyRoute, userController.user_list);

router.get("/info", verifyRoute, userController.user_details);

router.put("/edit", verifyRoute, userController.edit_user);

module.exports = router;
