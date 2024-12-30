const mongoose = require("mongoose");
const colorSchema = require("../schema/colorsSchema");

const colorsModal = mongoose.model("colorsModal", colorSchema);

module.exports = colorsModal;
