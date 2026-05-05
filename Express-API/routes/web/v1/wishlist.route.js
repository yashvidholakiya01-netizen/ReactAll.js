const express = require("express");
const router = express.Router();

const userMiddleware = require("../../../middlewares/user.middleware");
const wishlistController = require("../../../controllers/wishlist.controller");

router.post("/add", userMiddleware.authUser, wishlistController.AddToWishlist);

module.exports = router;
