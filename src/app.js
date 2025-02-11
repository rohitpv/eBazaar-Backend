const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const aiRoutes = require("./routes/aiRoutes"); // Add this line
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoutes);
app.use("/api", aiRoutes); // Add this line

// Error Middleware
app.use(errorHandler);

module.exports = app;