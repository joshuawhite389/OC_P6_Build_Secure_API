const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const saucesController = require("../controllers/sauces");

router.get("/", auth, saucesController.getSauces);
router.get("/:id", auth, saucesController.getOneSauce);
router.post("/", auth, saucesController.postSauces);
router.put("/:id", auth, saucesController.updateSauces);
router.delete("/:id", auth, saucesController.deleteSauces);
router.post("/:id/like", auth, saucesController.likeSauces);

module.exports = router;
