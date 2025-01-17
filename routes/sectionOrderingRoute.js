const express = require("express");
const sectionOrderingModal = require("../database/modals/sectionOrderingModal");

const router = express.Router();

// Get sections in order
router.get("/", async (req, res) => {
  try {
    const sections = await sectionOrderingModal.find().sort({ order: 1 }); // Sort sections by order
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sections" });
  }
});

// PUT route to update the order of sections using Bulk Update
router.put("/", async (req, res) => {
  const { sectionsOrder } = req.body; // Array of section IDs in the new order

  try {
    // Prepare the bulk update operations
    const bulkOps = sectionsOrder.map((sectionId, index) => ({
      updateOne: {
        filter: { _id: sectionId },
        update: { $set: { order: index } },
      },
    }));

    // Execute the bulk update
    await sectionOrderingModal.bulkWrite(bulkOps);

    res.json({ message: "Section order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating section order" });
  }
});

module.exports = router;
