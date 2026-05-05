const express = require("express")
const { router} = require("./admin.route")

router.post("/add", userMiddleware.authUser, cartController.AddToCart);

router.get("/all", userMiddleware.authUser, cartController.GetCart);

router.delete("/product/:id", userMiddleware.authUser, cartController.RemoveItem)


module.exports = router;

