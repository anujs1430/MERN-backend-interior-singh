const express = require("express");
const bannerModal = require("../database/modals/bannerModal");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { heading, description } = req.body;
    const bannerData = await bannerModal.findOneAndReplace(
      {}, // Search for any document
      {
        // Update the heading and paragraph
        heading,
        description,
      },
      // Create a new document if none exists
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: bannerData,
      message: "Banner data Updated successfully",
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
    const getbannerData = await bannerModal.find();

    res.status(200).json({
      success: true,
      data: getbannerData,
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

    const existingData = await bannerModal.find();

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing Banner data found",
      });
    }

    const updatedVisibility = await bannerModal.findOneAndUpdate(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Banner visibility updated successfully",
      data: updatedVisibility,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: "Error updating Banner visibility",
      error,
    });
  }
});

module.exports = router;
