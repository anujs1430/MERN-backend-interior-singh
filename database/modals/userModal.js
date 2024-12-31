const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");

const userModal = mongoose.model("userModel", userSchema);

module.exports = userModal;
