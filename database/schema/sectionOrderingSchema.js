const mongoose = require("mongoose");

const sectionOrderingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true }, // Order of the section
  },
  { timestamps: true }
);

module.exports = sectionOrderingSchema;
