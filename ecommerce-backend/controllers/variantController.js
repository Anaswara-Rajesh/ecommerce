const Variant = require("../models/Variant");
const Product = require("../models/Product");

exports.createVariant = async (req, res) => {
  const { productId, color, size, stock } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const variant = await Variant.create({
      product: productId,
      color,
      size,
      stock,
    });

    product.variants.push(variant._id);
    await product.save();

    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllVariants = async (req, res) => {
  try {
    const variants = await Variant.find().populate("product");
    res.json(variants);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getVariantById = async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id).populate("product");
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }
    res.json(variant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    variant.color = req.body.color || variant.color;
    variant.size = req.body.size || variant.size;
    variant.stock = req.body.stock || variant.stock;

    const updatedVariant = await variant.save();
    res.json(updatedVariant);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteVariant = async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    await Variant.findByIdAndDelete(req.params.id);

    const product = await Product.findById(variant.product);
    if (product) {
      product.variants = product.variants.filter(
        (v) => v.toString() !== req.params.id
      );
      await product.save();
    }

    res.json({ message: "Variant removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};