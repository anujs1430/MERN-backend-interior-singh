const express = require("express");
const servicesModal = require("../database/modals/servicesModal");
const multer = require("multer");
const fs = require("fs");

if (!fs.existsSync("upload/services")) {
  fs.mkdirSync("upload/services");
}

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/services");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.fields([{ name: "image" }]), async (req, res) => {
  try {
    const { title, description } = req.body;

    const servicesData = await servicesModal.create({
      title,
      description,
      image: req.files?.image
        ? `/upload/services/${req.files.image[0].filename}`
        : undefined,
    });

    res.status(200).json({
      success: true,
      data: servicesData,
      message: "Services data saved successfully",
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
    const getData = await servicesModal.find();

    res.status(200).json({
      success: true,
      data: getData,
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

    const deleteData = await servicesModal.findByIdAndDelete(id);

    if (!deleteData) {
      res.status(404).json({
        success: false,
        message: "Service id not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deleteData,
      message: "Service deleted successfully",
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

    const existingData = await servicesModal.find();

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "No existing Services data found",
      });
    }

    const updatedVisibility = await servicesModal.updateMany(
      {},
      { isVisible: isVisible },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedVisibility,
      message: "Services visibility updated successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "Error updating Services visibility",
      error,
    });
  }
});

module.exports = router;
