const express = require("express");
const router = express.Router();

const Sauce = require("../models/sauces");

router.get("/", (req, res, next) => {
  const Sauce = [
    {
      // _id: "string",
      // name: "string",
      // manufacturer: "string",
      // description: "string",
      // heat: 0,
      // likes: 0,
      // dislikes: 0,
      // imageUrl: "string",
      // mainPepper: "string",
      // usersLiked: [],
      // usersDisliked: [],
      // userId: "string",
    },
  ];
  res.status(200).json(sauces);
});

module.exports = router;
