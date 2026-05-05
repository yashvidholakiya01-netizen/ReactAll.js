const express = require("express")
const {body, validationResult} = require("express-validator")
const userController = require("../../../controllers/user.controller");
const middleware = require("../../../middlewares/user.middleware");
const router = express.Router();

// register a user 
// second validation -- use express validator package

router.post("/register",[
    body("username").isLength({min:4}).withMessage("username must be 4 character long"),
    body("email").isEmail({min:4}).withMessage("Enter Vaild email"),
    body("password").isLength({min:6}).withMessage("username must be 4 character long"),
], userController.registerUser
 )

router.post("/login", [
    body("email").isEmail().withMessage("enter vaild email"),
    body("password").isLength({min:6}).withMessage("password must be 6 character long"),
],userController.LoginUser)

router.get("/profile", middleware.authUser, userController.profile )

router.get("/logout", middleware.authUser , userController.logout)

router.put("/update", middleware.authUser, userController.updateUser)

module.exports = router;