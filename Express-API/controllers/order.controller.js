const orderService = require("../services/order.service");

module.exports.CreateOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    const order = await orderService.CreateOrder({ userId, items });

    if (!order) {
      return res.status(400).json({ msg: "product not found" });
    }

    return res.status(200).json({ msg: "order create successfully", order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.GetOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const order = await orderService.GetOrder(userId);
    if(!order) return res.status(404).json({msg: "order not found! "})

    return res.status(200).json({ msg: "order create successfully", order });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
