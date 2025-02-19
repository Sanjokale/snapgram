"use client";

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Post } from '@/components/post';

const PostFeed = ({userId} ) => {
  console.log(userId);
  
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const url = userId ? `http://localhost:8080/posts/${userId}` : "http://localhost:8080/posts"
      const { data } = await axios.get(url);
      setPosts(data); // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <Post key={post._id} post={post}  />
      ))}
    </div>
  );
};

export default PostFeed;