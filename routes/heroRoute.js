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

module.exports = router;
