const express = require("express");
const multer = require("multer");
const fs = require("fs");
const headerModal = require("../database/modals/headerModal");

// Check if the 'upload/' folder exists, if not, create it
if (!fs.existsSync("upload/header")) {
  fs.mkdirSync("upload/header");
}

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/header");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([{ name: "brandLogo" }]), async (req, res) => {
  try {
    const { email, phone, navbarBgColor } = req.body;

    // Get the existing header data from the database
    const existingData = await headerModal.findOne({});

    // If no data exists yet, create an empty object to prevent errors
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing header data found",
      });
    }

    // Check if the user has provided new values, otherwise keep the existing ones
    const headerData = await headerModal.findOneAndUpdate(
      {},
      {
        email: email || existingData.email, // Use existing email if not provided
        phone: phone || existingData.phone, // Use existing phone if not provided
        navbarBgColor: navbarBgColor || existingData.navbarBgColor, // Use existing navbarBgColor if not provided
        brandLogo: req.files?.brandLogo
          ? `/upload/header/${req.files.brandLogo[0].filename}`
          : existingData.brandLogo, // Use existing brandLogo if not provided
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: headerData,
      message: "Header data saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const getHeaderData = await headerModal.find();

    res.status(200).json({
      success: true,
      data: getHeaderData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "header Get API error",
      error,
    });
  }
});

router.post("/visibility", async (req, res) => {
  try {
    const { isVisible } = req.body; // Get the visibility state from the request body

    // Get the existing header data from the database
    const existingData = await headerModal.findOne();

    // If no data exists yet, create an empty object to prevent errors
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing header data found",
      });
    }

    // Update the visibility status
    const updatedVisibility = await headerModal.findOneAndUpdate(
      {},
      { isVisible: isVisible },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: updatedVisibility,
      message: "Header visibility updated successfully",
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: "Error updating header visibility",
      error,
    });
  }
});

module.exports = router;
