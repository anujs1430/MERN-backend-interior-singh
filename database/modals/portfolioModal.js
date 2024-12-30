const portfolioSchema = require("../schema/portfolioSchema");
const mongoose = require("mongoose");

const portfolioModal = mongoose.model("portfolioModal", portfolioSchema);

module.exports = portfolioModal;
