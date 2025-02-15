"use client"


import { useEffect, useState } from "react";
import { Post } from "./post"

 // Import currentUser
import { useSelector } from "react-redux";
import axios from "axios";

export function PostFeed() {
  const { userDetails} = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // const handleLike = (postId) => {
  //   setPosts(
  //     posts.map((post) => {
  //       if (post._id === postId) {
  //         const isLiked = post.likes.includes(currentUser.id)
  //         return {
  //           ...post,
  //           likes: isLiked ? post.likes.filter((id) => id !== currentUser.id) : [...post.likes, currentUser.id],
  //         }
  //       }
  //       return post
  //     }),
  //   )
  // }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} userDetails= {userDetails} />
      ))}
    </div>
  )
}

