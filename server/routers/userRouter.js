const express = require("express");
const router = express.Router();

var userController = require("../controllers/userController");

router.get("/list", userController.user_list);

router.get("/:userId", userController.user_details);

router.post("/create", userController.create_user);

router.put("/edit/:userId", userController.edit_user);

module.exports = router;
