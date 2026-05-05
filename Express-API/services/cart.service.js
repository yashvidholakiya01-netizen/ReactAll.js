module.exports.addToCart = async ({ userId, item }) => {};

module.exports.GetToCart = async ({ userId }) => {
  return await cartModel.find(userId);
};

module.exports.RemoveSingleProduct = async ({ userId, productId }) => {
  // find login user cart
  let cart = await cartModel.findOne({ userId });

  if (!cart) throw new Error("cart not found");

  // find index number of product based on productId
  const itemIndex = cart.items.findIndex((i) => i.productId.equals(productId));

  console.log(itemIndex);
  if (itemIndex < 0) {
    throw new Error("item not found");
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();
};
