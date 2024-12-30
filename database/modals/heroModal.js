const mongoose = require("mongoose");
const heroSchema = require("../schema/heroSchema");

const heroModal = mongoose.model("heroModel", heroSchema);

module.exports = heroModal;
