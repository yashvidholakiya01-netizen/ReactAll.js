// - product creation
// - product read single and all
// - product update
// - product delete

const express = require("express");
const userMiddleware = require("../../../middlewares/user.middleware");
const adminMiddleware = require("../../../middlewares/admin.middleware");
const productController = require("../../../controllers/product.controller");

const router = express.Router();

router.post(
  "/add",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.createProduct,
);

// authUser ==> check user login or not ? ==> if login then --> req.user (give you back)
// authAdMIN ==> req.user ==> check role ==> admin or not --> jump to next router
router.get(
  "/all",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.allProduct,
);

router.get(
  "/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.singleProduct,
);



router.put(
  "/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.updateProduct,
);

router.delete(
  "/:id",
  userMiddleware.authUser,
  adminMiddleware.authAdmin,
  productController.deleteProduct,
);


module.exports = router;
