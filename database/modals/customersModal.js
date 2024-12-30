const mongoose = require("mongoose");
const customerSchema = require("../schema/customersSchema");

const customerModal = mongoose.model("customer", customerSchema);

module.exports = customerModal;
