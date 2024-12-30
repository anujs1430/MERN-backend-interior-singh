const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = portfolioSchema;
