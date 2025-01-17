const express = require("express");
const heroModal = require("../database/modals/heroModal");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, heading, paragraph } = req.body;

    const heroData = await heroModal.findOneAndReplace(
      {}, // Search for any document
      {
        // Update the heading and paragraph
        title,
        heading,
        paragraph,
      },
      {
        // Create a new document if none exists
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Hero data Updated successfully",
      data: heroData,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      "HeroPost API Error": error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const getHeroData = await heroModal.find();

    res.status(200).json({
      success: true,
      data: getHeroData,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Hero API Error: ",
      error,
    });
  }
});

router.post("/visibility", async (req, res) => {
  try {
    const { isVisible } = req.body; // Get the visibility state from the request body

    // Get the existing hero data from the database
    const existingData = await heroModal.find();

    // If no data exists yet, create an empty object to prevent errors
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing Hero data found",
      });
    }

    // Update the visibility status
    const updatedVisibility = await heroModal.findOneAndUpdate(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Hero visibility updated successfully",
      data: updatedVisibility,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Error updating hero visibility",
      error,
    });
  }
});

module.exports = router;
