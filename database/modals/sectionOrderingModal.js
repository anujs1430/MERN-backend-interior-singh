const mongoose = require("mongoose");
const sectionOrderingSchema = require("../schema/sectionOrderingSchema");

const sectionOrderingModal = mongoose.model(
  "sectionOrderingModal",
  sectionOrderingSchema
);

module.exports = sectionOrderingModal;
