const express = require("express");
const mongoose = require("mongoose");

const app = express();

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://joshuawhite389:BDlXoTM3UdvO5cdX@cluster0.2r2plmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// Middleware to set headers on each response.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/auth", userRoutes);

app.use('/api/sauces', sauceRoutes);

module.exports = app;
