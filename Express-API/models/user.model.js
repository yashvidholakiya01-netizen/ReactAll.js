const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//database validation
let userSchema = mongoose.Schema({
  username: { type: String, minlength: 4, unique: true, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false }, // find query -- select false --> res ma add na thay
  role: { type: String, enum: ["user", "admin", "mamager"], default: "user" },
});

//jwt token
userSchema.methods.generateAuthToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // this.id aetle database user id
  return token;
};
//bcrypt
//hash (static)
userSchema.statics.hashPassword = async function (password) {
  let hash = await bcrypt.hash(password, 10);

  return hash;
};
//compare (methods)
userSchema.methods.comparepassword = async function (password) {
  let result = await bcrypt.compare(password, this.password);
  //this this.password --> database user's password

  return result;
};

module.exports = mongoose.model("users", userSchema);
