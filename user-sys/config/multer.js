const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(6).toString("hex") + path.extname(file.originalname);
    cb(null,  uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;