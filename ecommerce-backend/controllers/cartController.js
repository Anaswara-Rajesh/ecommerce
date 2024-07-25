const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Variant = require("../models/Variant");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product items.variant",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, variantId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    const variant = await Variant.findById(variantId);

    if (!product || !variant) {
      return res.status(404).json({ message: "Product or variant not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId
    );

    if (existingItem) {
      return res.status(400).json({ message: "Item already in cart" });
    }

    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
    });

    await cart.save();
    res.status(201).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { productId, variantId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId
    );

    if (item) {
      item.quantity = quantity;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { productId, variantId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId?._id ||
        item.variant.toString() !== variantId?._id
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
