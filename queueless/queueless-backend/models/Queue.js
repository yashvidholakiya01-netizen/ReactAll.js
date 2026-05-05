const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: String,
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      position: Number,
      joinedAt: { type: Date, default: Date.now }
    }
  ],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Queue", queueSchema);