const express = require("express");
const customerModal = require("../database/modals/customersModal");

const router = express.Router();

router.post("/getcontact", async (req, res) => {
  try {
    const { name, email, phone, subject, comment } = req.body;

    const customerData = await customerModal.create({
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      comment: comment,
    });

    res.status(200).json({
      message: "Contact information saved successfully.",
      data: customerData,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "This email already exists. Please use another email.",
      });
    }
    console.log(err);
    res.status(400).json({ success: false, "post API Error": err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const customerData = await customerModal.find();

    if (!customerData) {
      return res.status(404).json({
        success: false,
        message: "No existing Customer query data found",
      });
    }

    res.status(200).json({
      success: true,
      data: customerData,
      message: "Customers Queries fetched successfully",
    });

    res.status(200);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: "Unable to fetch Customers data",
      error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteData = await customerModal.findByIdAndDelete(id);

    if (!deleteData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
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

module.exports = router;
