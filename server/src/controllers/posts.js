const Post = require("../models/post");


const createPost = async (req, res) => {
  const { user, content } = req.body;
  let image = null;
  if (req.file) {
    image = req.file.filename;
  }
  await Post.create({user, content, image})
  //console.log(req.file);
  res.send({ msg: "Post Created Successfully" });
};


const getAllPost = async (req, res) => {
  const data = await Post.find().populate('user')
  res.json(data)

}

const getPost = async (req, res) => {
  const data = await Post.find({user: req.params.id}).populate("user")
  if(!data) {
    res.send({msg: "you do not have any post"})
  } else {
    res.json(data)
  }
}

const Comment = require("../models/comment");

const createCommentOnPost = async (req, res) => {
  const postId = req.params.postId;
  const { commentedBy, text } = req.body;
  await Comment.create({commentedBy, text, post: postId})
  res.send({ msg: "Comment Created Successfully" });
};

const getCommentsOnPost = async (req, res) => {
  const postId = req.params.postId;
  const data = await Comment.find({ post: postId }).populate("commentedBy", "username avatar");
  res.json(data)
}

const postLikeToggled = async (req,res) => {
  const {userId, postId} = req.body;
  const post = await Post.findById(postId);

  if(!post) {
    return res.status(404),json({msg: "post not found"})
  }
  const isLiked = post.likes?.includes(userId)
  
  
  if(isLiked) {
    post.likes = post.likes.filter( id => id.toString() !== userId.toString())
    await post.save();
    res.json({msg: "Post unliked successfully!!", isLiked})
  } else {
    post.likes.push(userId)
    post.save()
    res.json({msg: "Post liked successfully"})
  }
 
  
//   if (isLiked) {  
//     // Unlike: Remove user ID from likes array
//     await Post.findByIdAndUpdate(postId, {
//         $pull: { likes: userId }  //if we use the mongoose operator
//     });
//     res.json({ message: 'Post unliked successfully' });
// } else {
//     // Like: Add user ID to likes array
//     await Post.findByIdAndUpdate(postId, {
//         $push: { likes: userId }
//     }); 
}

const PostLikesCount =  async(req, res) => {
  const {postId, userId} = req.params
  console.log(userId);
  
  const post = await Post.findById(postId)
  if(post) {
    const likesCount = post.likes.length;
    const isLiked = post.likes.includes(userId)
    console.log(isLiked);
    
    return res.json({isLiked, likesCount})
  }
  return res.status(404).json({msg: "post not found "})
}
  
 
module.exports = { createPost, getAllPost, PostLikesCount, createCommentOnPost, getCommentsOnPost, postLikeToggled, getPost}
