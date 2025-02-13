const { Router } = require("express");

const { createPost, getAllPost } = require("../controllers/posts");
const { postUpload } = require("../middlewares/multer");

const postRoute = Router();



postRoute.post("/post", postUpload.single("image"), createPost);
postRoute.get("/posts", getAllPost);

module.exports = postRoute;
