module.exports.addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.boby;

    const Exit = await cartModel.findOne({ userId });
    const existProduct = Exit.item.map((val) => {
      const ids = val.productId;
      return ids;
    });
    existProduct.forEach((e) => {
      if (e.equals(item.productId)) {
        return res
          .status(400)
          .json({ msg: "product alreay is add into cart  " });
      }
    });

    const cart = await cartService.addToCart({ userId, item });

    return res.status(200).json({ msg: "cart successfully ", cart });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports.GetCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await cartService.GetCart(userId);

    if (!cart) {
      return res.status(400).json({ msg: "cart not found" });
    }
    return res.status(200).json({ msg: "cart successfully ", cart });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

//remove

module.exports.RemoveItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    await cartService.RemoveSingleProduct({ userId, productId });

    return res.status(200).json({ msg: "remove cart successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

