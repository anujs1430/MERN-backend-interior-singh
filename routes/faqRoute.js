const express = require("express");
const faqModal = require("../database/modals/faqModal");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faqData = await faqModal.create({
      question: question,
      answer: answer,
    });

    res.status(200).json({
      success: true,
      data: faqData,
      message: "FAQ's data saved successfully",
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
    const data = await faqModal.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No existing data found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ's data found successfully",
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { question, answer } = req.body;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "No existing FAQ found",
      });
    }

    const updatedFaq = await faqModal.findByIdAndUpdate(
      id,
      {
        question: question,
        answer: answer,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedFaq,
      message: "FAQ updated successfully",
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await faqModal.findByIdAndDelete(id);

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "No existing Question found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Questing deleted successfully",
      data: deleteData,
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

    const existingData = await faqModal.find();

    if (!existingData || existingData.length === 0) {
      res.status(404).json({
        success: false,
        message: "No existing FAQ's found",
      });
    }

    const updatedVisibility = await faqModal.updateMany(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedVisibility,
      message: "visibility updated successfully",
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
