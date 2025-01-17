const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  description: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

module.exports = bannerSchema;
