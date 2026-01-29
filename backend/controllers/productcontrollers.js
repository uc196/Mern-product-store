import Product from "../models/product.js";
import mongoose from "mongoose";

// POST: Create a product
export const createProduct = async (req, res) => {
  const product = req.body;

  // Validate the required fields
  if (!product.name || !product.price ||  !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newProduct = new Product(product);  // Create new product from the body
    const savedProduct = await newProduct.save();  // Save the product to DB
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;  // Get the product ID from the URL params
  const updatedProduct = req.body;  // Get the updated data from the request body

  // Validate the required fields
  if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
    return res.status(400).json({ success: false, message: "Please provide all fields to update" });
  }

  try {
    // Find the product by ID and update it
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // If update is successful, send the updated product
    res.status(200).json({ success: true, data: product });

  } catch (error) {
    // Catch any errors and send a server error response
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Could not update product." });
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
