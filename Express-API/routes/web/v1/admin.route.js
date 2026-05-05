const express = require("express");
const router = express.Router();
const middleware = require("../../../middlewares/admin.middleware");
const adminController = require("../../../controllers/admin.controller");
const usermiddleware = require("../../../middlewares/user.middleware");
const { body } = require("express-validator");

// show all users
// login user --> check user is Admin? --> show all users
router.get(
  "/all/user",
  usermiddleware.authUser,
  middleware.authAdmin,
  adminController.AllUser,
);

// Delete User
router.delete(
  "/user/:id",
  usermiddleware.authUser,
  middleware.authAdmin,
  adminController.deleteUser,
);

router.post(
  "/manager/create",
  [
    body("username")
      .isLength({ min: 4 })
      .withMessage("username must be 4 character long"),
    body("email").isEmail({ min: 4 }).withMessage("Enter Vaild email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("username must be 4 character long"),
  ],
  usermiddleware.authUser,
  middleware.authAdmin,
  adminController.registerManager,
);
module.exports = router;
