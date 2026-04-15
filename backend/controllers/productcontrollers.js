import Product from "../models/product.js";
import mongoose from "mongoose";

// POST: Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body || {};
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "name, price and image are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
    });

    return res.status(201).json({
      success: true,
      data: product,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PUT: Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Product.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updatedData = {
      name: req.body.name || existing.name,
      price: req.body.price || existing.price,
      image: req.file ? req.file.filename : existing.image,
    };

    const updated = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE: Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;  // Get the product ID from the URL params
  try {
    // Find and delete the product by ID using the correct Product model
    const productToDelete = await Product.findByIdAndDelete(id);

    // If the product doesn't exist, return a 404 error
    if (!productToDelete) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // If deletion is successful, send a success response
    res.status(200).json({ success: true, message: "Product deleted successfully" });

  } catch (error) {
    // Catch any errors and send a server error response
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Could not delete product." });
  }
};

// GET: Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();  // Retrieve all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Could not fetch products." });
  }
};

// GET: Get a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;  // Get the product ID from the URL params
  try {
    const product = await Product.findById(id);  // Find the product by ID

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });  // Send the product data in response
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Could not fetch product." });
  }
};
