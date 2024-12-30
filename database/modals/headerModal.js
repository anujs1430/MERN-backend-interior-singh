const mongoose = require("mongoose");
const headerSchema = require("../schema/headerSchema");

const headerModal = mongoose.model("headerModel", headerSchema);

module.exports = headerModal;
