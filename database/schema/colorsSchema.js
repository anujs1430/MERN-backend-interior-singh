const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    primaryColor: {
      type: String,
    },

    secondaryColor: {
      type: String,
    },

    heroBanner: {
      type: String,
    },

    secondaryBanner: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = colorSchema;
