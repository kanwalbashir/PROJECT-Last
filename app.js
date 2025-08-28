// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');// middleware
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require("path");
const { connectDb }= require("./config/db")
// Import routes
// Initialize the app
const app = express();
// Configure dotenv
dotenv.config();
require('dotenv').config();
connectDb();
// Middleware setup
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev'));
// API Routes
app.use('/api/auth',require("./routes/authRoutes"));
app.use('/api/announcement', require("./routes/announcementRoutes")); 
app.use('/api/bookings', require("./routes/bookigRoutes"));
app.use("/api/category", require("./routes/categoryRoutes")); 
app.use('/api/contact', require("./routes/msgRoutes"));
app.use("/api/recipes", require("./routes/recipesRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use('/api/chefs',require("./routes/chefRoutes"));
app.use("/api/orders",require("./routes/orderRoutes"));
app.use("/api/gallery",require("./routes/galleryRoutes"));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Set up a basic route for testing
app.get('/', (req, res) => {
  return res.status(200).send("<h1>Welcome to the Restaurant Management system System API!</h1>");
});

// Start the server
const PORT=process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
