const express = require("express");
const mongoose = require("mongoose");

const app = express();

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

app.use('/api/sauces',(req, res, next) => {
  const sauces = [
    {
      "_id": "string",
      "name": "string",
      "manufacturer": "string",
      "description": "string",
      "heat": 0,
      "likes": 0,
      "dislikes": 0,
      "imageUrl": "string",
      "mainPepper": "string",
      "usersLiked": [],
      "usersDisliked": [],
      "userId": "string"
    }
  ];
  res.status(200).json(sauces);
});

module.exports = app;
