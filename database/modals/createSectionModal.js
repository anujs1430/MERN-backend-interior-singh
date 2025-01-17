const mongoose = require("mongoose");
const createSectionSchema = require("../schema/createSectionSchema");

const createSectionModal = mongoose.model("createSection", createSectionSchema);

module.exports = createSectionModal;
