const mongoose = require("mongoose");

const createSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    require: true,
  },
  subName: {
    type: String,
    require: true,
  },
  subPara: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  mainHeading: {
    type: String,
    require: true,
  },
  mainParagraph: {
    type: String,
    require: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

module.exports = createSectionSchema;
