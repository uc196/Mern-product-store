import express from 'express';
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getAllProducts, 
  getProductById 
} from "../controllers/productcontrollers.js"; // Import the controller methods
import { upload } from '../config/upload.js';


const router = express.Router();

// POST Route to Create a Product
router.post("/", upload.single('image'), createProduct); // Use multer middleware for file upload
router.put("/:id", upload.single("image"), updateProduct);
// PUT Route to Update a Product by ID

// DELETE Route to Delete a Product by ID
router.delete("/:id", deleteProduct);

// GET Route to Get All Products
router.get("/", getAllProducts);

// GET Route to Get a Product by ID
router.get("/:id", getProductById);


export default router;  
