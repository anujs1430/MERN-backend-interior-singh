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

module.exports = router;
