const mongoose = require("mongoose");
const faqSchema = require("../schema/faqSchema");

const faqModal = mongoose.model("faqModal", faqSchema);

module.exports = faqModal;
