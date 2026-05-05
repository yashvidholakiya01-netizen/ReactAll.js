const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongodb-AA");

let usermodel = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

module.exports = mongoose.model("user",usermodel)