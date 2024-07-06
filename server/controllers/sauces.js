const Sauce = require("../models/sauces");
const fs = require("fs");

// Get all sauces, .find()requires no argument
exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Get one sauce, .findOne() requires sauce id passed in the body
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Create a new sauce, get the whole body from the request, parse this into a new Sauce object
exports.postSauces = (req, res, next) => {
  // Data coming from front end is stringified form data, need it to be JSON
  req.body.sauce = JSON.parse(req.body.sauce);
  // req.protocol is either http or https and req.get("host") is the domain name, localhost for this
  const url = req.protocol + "://" + req.get("host");
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    imageUrl: url + "/images/" + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    userId: req.body.sauce.userId,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Updating a sauce based on id passed in the body.  Essentially the same as creating a new sauce, but passing the id so we can use the update function
exports.updateSauces = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + "://" + req.get("host");
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      imageUrl: url + "/images/" + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      userId: req.body.sauce.userId,
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      userId: req.body.userId,
    };
  }

  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//find sauce by id and delete it
exports.deleteSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    // Cannot delete a sauce that doesn't exist
    if (!sauce) {
      return res.status(404).json({
        error: new Error("No such sauce"),
      });
    }
    // This checks the user id added in the auth middleware to ensure the user is the owner of the sauce
    if (sauce.userId !== req.auth.userId) {
      return res.status(400).json({
        error: new Error("Unauthorized request"),
      });
    }
    // This deletes the image from the image folder before actually deleting the object from the database
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
    if (!sauce) {
      return res.status(404).json({
        error: new Error("No such sauce"),
      });
    }
  });
};

// Like or dislike a sauce, depending on the value of the like key in the body, add the user id to the appropriate array and increment the like or dislike count
exports.likeSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.body.userId);
        sauce.likes += 1;
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.body.userId);
        sauce.dislikes += 1;
      }
      // If the user has already liked or disliked the sauce, remove the user id from the appropriate array and decrement the like or dislike count
      else if (req.body.like === 0) {
        if (sauce.usersLiked.includes(req.body.userId)) {
          sauce.usersLiked = sauce.usersLiked.filter(
            (user) => user !== req.body.userId
          );
          sauce.likes -= 1;
        } else {
          sauce.usersDisliked = sauce.usersDisliked.filter(
            (user) => user !== req.body.userId
          );
          sauce.dislikes -= 1;
        }
      }
      Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => {
          res.status(201).json({
            message: "Liked/Disliked!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
