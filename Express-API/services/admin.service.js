const userModel = require("../models/user.model");

module.exports.getAllUser = async () => {
  const allUser = await userModel.find();

  return allUser;
};

module.exports.deleteUser = async (id) => {
  const user = await userModel.findOneAndDelete({ _id: id });

  return user;
};

module.exports.createManager = async ({ username, email, password, role }) => {
  if (!username || !email || !password) {
    throw new Error("All Filed Are Required");
  }

  const user = await userModel.create({
    username,
    email,
    password,
    role: "manager",
  });
  return user;
};
