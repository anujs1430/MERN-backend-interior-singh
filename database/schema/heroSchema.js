const mongoose = require("mongoose");

const heroData = new mongoose.Schema(
  {
    title: {
      type: String,
      require: false,
    },
    heading: {
      type: String,
      require: false,
    },
    paragraph: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = heroData;
