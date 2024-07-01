const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config();

const app = express();

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");


app.use(express.json());
mongoose
  .connect(
    process.env.MONGO_DB_CONNECTION_STRING,
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
// Serve static images from the images folder so express knows what to do with images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/auth", userRoutes);

app.use('/api/sauces', sauceRoutes);

module.exports = app;
