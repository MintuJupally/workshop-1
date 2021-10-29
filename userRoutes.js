const express = require("express");

const router = express.Router();

const userController = require("./userController");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserBydId)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
