const mongoose = require("mongoose");
// const dbgr = require("debug");
// const config = require("config");

function connetDb() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mogodb connect...")
    })
    .catch((err) => {
        console.log(err)
    })
}

// function connetDb() {
//     mongoose.connect(`${config.get("MongoDB_URL")}/ecommerce`)
//     .then(() => {
//        dbgr("mogodb connect")
//     })
//     .catch((err) => {
//         dbgr(err)
//     })
// }

module.exports = connetDb