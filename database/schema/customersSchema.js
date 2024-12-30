const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: false,
      unique: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    subject: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: false,
    },
  },
  { timestamps: true } //enable timing
);

module.exports = customerSchema;
