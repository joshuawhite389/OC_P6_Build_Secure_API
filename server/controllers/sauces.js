const Sauce = require("../models/sauces");

exports.getSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};

exports.getOneSauce = (req, res, next) => {};

exports.postSauces = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + "://" + req.get("host");
  console.log(req.body);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    imageUrl: url + "/images/" + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    userId: req.body.sauce.userId,
  });
  console.log(sauce);
  sauce.save().then(
    () => {
      res.status(201).json({
        message: "Sauce saved successfully!"
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};

exports.updateSauces = (req, res, next) => {};

exports.deleteSauces = (req, res, next) => {};

exports.likeSauces = (req, res, next) => {};
