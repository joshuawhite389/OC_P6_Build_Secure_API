const mongoose = require("mongoose");

const saucesSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0},
  dislikes: { type: Number, required: false, default: 0},
  imageUrl: { type: String, required: false },
  mainPepper: { type: String, required: true },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false },
  userId: { type: String, required: true },
}); 

module.exports = mongoose.model("Sauce", saucesSchema);
