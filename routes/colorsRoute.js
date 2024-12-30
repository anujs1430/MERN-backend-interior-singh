const express = require("express");
const colorsModal = require("../database/modals/colorsModal");
const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("upload/banners")) {
  fs.mkdirSync("upload/banners");
}

const router = express.Router();

// ===setup the multer storage===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/banners"); //this "upload" folder must exist
  },
  filename: (res, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([{ name: "heroBanner" }, { name: "secondaryBanner" }]),
  async (req, res) => {
    try {
      const { primaryColor, secondaryColor } = req.body;

      const existingData = await colorsModal.find({});

      const colorsData = await colorsModal.findOneAndUpdate(
        {},
        {
          primaryColor: primaryColor || existingData.primaryColor,
          secondaryColor: secondaryColor || existingData.secondaryColor,
          heroBanner: req.files?.heroBanner
            ? `/upload/banners/${req.files.heroBanner[0].filename}`
            : existingData.heroBanner,
          secondaryBanner: req.files?.secondaryBanner
            ? `/upload/banners/${req.files.secondaryBanner[0].filename}`
            : existingData.secondaryBanner,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({
        success: true,
        data: colorsData,
        message: "Colors has been update",
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        success: false,
        error,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const data = await colorsModal.find();

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
