const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: false,
    },
    phone: {
      type: String,
      require: false,
    },
    brandLogo: {
      type: String,
      require: false,
    },
    navbarBgColor: {
      type: String,
      require: false,
      default: "#ffffff", // Set a default color
    },
  },
  { timestamps: true }
);

module.exports = headerSchema;
