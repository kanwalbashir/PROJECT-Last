const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get("/", categoryController.getCategories);
router.post("/", upload.single("img"), categoryController.addCategory);
router.put("/:id", upload.single("img"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
module.exports = router;