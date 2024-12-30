const mongoose = require("mongoose");
const aboutSchema = require("../schema/aboutSchema");

const aboutModal = mongoose.model("aboutModal", aboutSchema);

module.exports = aboutModal;
