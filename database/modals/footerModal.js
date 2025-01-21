const mongoose = require("mongoose");
const footerSchema = require("../schema/footerSchema");

const footerModal = mongoose.model("footerModal", footerSchema);

module.exports = footerModal;
