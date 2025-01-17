const express = require("express");
const createSectionModal = require("../database/modals/createSectionModal");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

if (!fs.existsSync("upload/newSection")) {
  fs.mkdirSync("upload/newSection"); // Ensure the upload directory exists
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/newSection");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { sectionName, subName, subPara, mainHeading, mainParagraph } =
      req.body;

    const createSectionData = await createSectionModal.create({
      sectionName,
      subName,
      subPara,
      mainHeading,
      mainParagraph,
      image: req.file ? `upload/newSection/${req.file.filename}` : undefined,
    });

    res.status(200).json({
      success: true,
      data: createSectionData,
      message: "New section created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const sectionData = await createSectionModal.find();

    if (!sectionData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
        data: sectionData,
      });
    }

    res.status(200).json({
      success: true,
      data: sectionData,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const { sectionName, subName, subPara, mainHeading, mainParagraph } =
      req.body;

    const updateSection = {
      sectionName,
      subName,
      subPara,
      mainHeading,
      mainParagraph,
    };

    // If a new image is uploaded, update the image field
    if (req.file) {
      updateSection.image = `upload/newSection/${req.file.filename}`;
    }

    const updatedSection = await createSectionModal.findByIdAndUpdate(
      id,
      updateSection,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedSection,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
      message: "Unable to update the section",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSection = await createSectionModal.findByIdAndDelete(id);

    if (!deleteSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deleteSection,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

router.post("/visibility/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body; // Get the visibility status

    // Find the section by id and update its visibility
    const updatedSection = await createSectionModal.findByIdAndUpdate(
      id,
      { isVisible: isVisible }, // Update visibility field
      { new: true } // Return the updated document
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "No existing section found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedVisibility,
      message: "Visibility updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
