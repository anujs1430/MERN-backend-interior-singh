const express = require("express");
const multer = require("multer");
const aboutModal = require("../database/modals/aboutModal");
const fs = require("fs");

// Check if the 'upload/' folder exists, if not, create it
if (!fs.existsSync("upload/about")) {
  fs.mkdirSync("upload/about");
}

const router = express.Router();

// ===setup the multer storage===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/about"); //this "upload" folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([{ name: "mainImage" }, { name: "subImage" }]),
  async (req, res) => {
    try {
      const { heading, paragraph } = req.body;

      // === this the way to post new data old data will be replaced ===
      const aboutData = await aboutModal.findOneAndReplace(
        {}, //search for the existing about document
        {
          heading: heading,
          paragraph: paragraph,
          mainImage: req.files.mainImage
            ? `/upload/about/${req.files.mainImage[0].filename}`
            : undefined,
          subImage: req.files.subImage
            ? `/upload/about/${req.files.subImage[0].filename}`
            : undefined,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({
        success: true,
        message: "About data saved successfully",
        data: aboutData,
      });
    } catch (error) {
      console.log(error);

      res
        .status(400)
        .json({ success: false, "Aboutpost API Error": error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const GetAboutData = await aboutModal.find();

    res.status(200).json(GetAboutData);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "about API Error:",
      error,
    });
  }
});

router.post("/visibility", async (req, res) => {
  try {
    const { isVisible } = req.body;

    const existingData = await aboutModal.find();

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing About data found",
      });
    }

    const updatedVisibility = await aboutModal.findOneAndUpdate(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedVisibility,
      message: "Header visibility updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Error updating About visibility",
      error,
    });
  }
});

module.exports = router;
