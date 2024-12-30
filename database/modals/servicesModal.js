const mongoose = require("mongoose");
const servicesSchema = require("../schema/servicesSchema");

const servicesModal = mongoose.model("servicesModal", servicesSchema);

module.exports = servicesModal;
