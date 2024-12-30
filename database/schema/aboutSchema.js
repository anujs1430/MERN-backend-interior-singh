const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      require: false,
    },
    paragraph: {
      type: String,
      require: false,
    },
    mainImage: {
      type: String,
      require: false,
    },
    subImage: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = aboutSchema;
