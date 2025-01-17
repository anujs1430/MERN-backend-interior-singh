const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = portfolioSchema;
