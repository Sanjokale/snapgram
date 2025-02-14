const { Router } = require("express");

const { createPost, getAllPost,  createCommentOnPost, getCommentsOnPost } = require("../controllers/posts");
const { postUpload } = require("../middlewares/multer");

const postRoute = Router();



postRoute.post("/post", postUpload.single("image"), createPost);
postRoute.get("/posts", getAllPost);
postRoute.post("/post/:postId/comment", createCommentOnPost )
postRoute.get("/post/:postId/comment", getCommentsOnPost )

module.exports = postRoute;
