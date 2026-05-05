const express = require("express")
const router = express.Router();
const userMiddleware = require("../../../middlewares/user.middleware")
const orderController = require("../../../controllers/order.controller")

router.post("/add", userMiddleware.authUser, orderController.CreateOrder)
router.get("/all", userMiddleware.authUser, orderController.GetOrder)


module.exports = router;

