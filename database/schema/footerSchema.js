const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    brandIcon: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = footerSchema;
