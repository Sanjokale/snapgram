const { Router } = require("express");

const { createPost, getAllPost,  createCommentOnPost, getCommentsOnPost, postLikeToggled } = require("../controllers/posts");
const { postUpload } = require("../middlewares/multer");

const postRoute = Router();



postRoute.post("/post", postUpload.single("image"), createPost);
postRoute.get("/posts", getAllPost);
postRoute.post("/post/:postId/comment", createCommentOnPost )
postRoute.get("/post/:postId/comments", getCommentsOnPost )
postRoute.put("/post/like", postLikeToggled)

module.exports = postRoute;
