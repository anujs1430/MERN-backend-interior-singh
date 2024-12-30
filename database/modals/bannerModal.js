const mongoose = require("mongoose");
const bannerSchema = require("../schema/bannerSchema");

const bannerModal = mongoose.model("bannerModal", bannerSchema);

module.exports = bannerModal;
