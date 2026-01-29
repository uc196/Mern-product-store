import express from 'express';
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getAllProducts, 
  getProductById 
} from "../controllers/productcontrollers.js"; // Import the controller methods

const router = express.Router();

// POST Route to Create a Product
router.post("/", createProduct);

// PUT Route to Update a Product by ID
router.put("/:id", updateProduct);

// DELETE Route to Delete a Product by ID
router.delete("/:id", deleteProduct);

// GET Route to Get All Products
router.get("/", getAllProducts);

// GET Route to Get a Product by ID
router.get("/:id", getProductById);

export default router;  // Correct export
