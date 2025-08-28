const Gallery = require("../model/galleryModel"); 

//  Upload Image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const newImage = new Gallery({
      imageUrl: `/uploads/gallery/${req.file.filename}`  // ✅ always full path
    });

    await newImage.save();
    res.json({
      _id: newImage._id,
      img: newImage.imageUrl,  // ✅ frontend will use this
      createdAt: newImage.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get All Images
exports.getAllImages = async (req, res) => {
 try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    //  format response for frontend
    res.json(
      images.map(img => ({
        _id: img._id,
        img: img.imageUrl,   // return as `img`
        createdAt: img.createdAt
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};
//  Delete Image
exports.deleteImage = async (req, res) => {
 try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Image not found" });

    // 📂 Build file path
    const filePath = path.join(__dirname, "..", "uploads", deleted.imageUrl);

    // 🧹 Remove file from uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("File deletion error:", err);
        // Don't fail request just because file is missing
      }
    });

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};