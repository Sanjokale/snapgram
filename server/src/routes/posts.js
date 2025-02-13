const { Router } = require("express");
const multer = require("multer");
const { createPost, getAllPost } = require("../controllers/posts");

const postRoute = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
postRoute.post("/post", upload.single("image"), createPost);
postRoute.get("/posts", getAllPost);

module.exports = postRoute;
