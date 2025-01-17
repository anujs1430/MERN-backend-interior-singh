const express = require("express");
const multer = require("multer");
const portfolioModal = require("../database/modals/portfolioModal");
const fs = require("fs");

const router = express.Router();

if (!fs.existsSync("upload/portfolio")) {
  fs.mkdirSync("upload/portfolio");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/portfolio");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([{ name: "image" }]), async (req, res) => {
  try {
    const { description } = req.body;

    const portfolioData = await portfolioModal.create({
      description,
      image: req.files?.image
        ? `/upload/portfolio/${req.files.image[0].filename}`
        : undefined,
    });

    res.status(200).json({
      success: true,
      data: portfolioData,
      message: "portfolio data saved successfully",
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
    const portfolioGetData = await portfolioModal.find();

    res.status(200).json({
      success: true,
      data: portfolioGetData,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletePortfolio = await portfolioModal.findByIdAndDelete(id);

    if (!deletePortfolio) {
      res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletePortfolio,
      message: "portfolio deleted successdfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

router.post("/visibility", async (req, res) => {
  try {
    const { isVisible } = req.body;

    const existingData = await portfolioModal.find();

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing Portfolio data found",
      });
    }

    const updatedVisibility = await portfolioModal.updateMany(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio visibility updated successfully",
      data: updatedVisibility,
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      message: "Error updating Protfolio visibility",
      error,
    });
  }
});

module.exports = router;
