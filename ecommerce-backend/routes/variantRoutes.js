const express = require("express");
const {
  createVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("../controllers/variantController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createVariant);

router.get("/", getAllVariants);

router.get("/:id", getVariantById);

router.put("/:id", protect, updateVariant);

router.delete("/:id", protect, deleteVariant);

module.exports = router;
