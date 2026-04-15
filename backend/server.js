import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productroute from './routes/Productroute.js';


dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

app.use('/uploads', express.static('uploads')); // Serve uploaded images

app.use(express.static('public')); // Serve static files from the 'public' directory

// POST Route to Create a Product
app.use("/api/products", productroute);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
