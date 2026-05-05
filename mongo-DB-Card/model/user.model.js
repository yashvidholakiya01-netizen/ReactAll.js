const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/user-card")

let userSehma = mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    image: String
},
{timestamps: true},)

module.exports = mongoose.model("usercard", userSehma);