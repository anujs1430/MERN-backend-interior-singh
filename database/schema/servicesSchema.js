const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  image: {
    type: String,
    require: false,
  },
  title: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
  isVisible: {
    type: Boolean,
    default: true,
  }, // New field for visibility
});

module.exports = servicesSchema;
