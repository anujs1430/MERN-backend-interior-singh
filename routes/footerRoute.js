const express = require("express");
const footerModal = require("../database/modals/footerModal");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

if (!fs.existsSync("upload/footer")) {
  fs.mkdirSync("upload/footer");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/footer");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("brandIcon"), async (req, res) => {
  try {
    const { description, address, email, phone } = req.body;

    const createFooter = await footerModal.findOneAndUpdate(
      {}, //search for the existing about document
      {
        description,
        address,
        email,
        phone,
        brandIcon: req.file ? `upload/footer/${req.file.filename}` : undefined,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: createFooter,
      message: "Data has been updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await footerModal.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No existing data found",
      });
    }

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
});

router.post("/visibility", async (req, res) => {
  try {
    const { isVisible } = req.body;

    const footerData = await footerModal.find();

    if (!footerData || footerData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No existing footer data found",
      });
    }

    const updatedVisibility = await footerModal.findOneAndUpdate(
      {},
      {
        isVisible: isVisible,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Visibility updated successfully",
      data: updatedVisibility,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
