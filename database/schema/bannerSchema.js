const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = bannerSchema;
