"use client";

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Post } from '@/components/post';

const PostFeed = ({ userDetails }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/posts');
      setPosts(data.posts); // Adjust based on your API response structure
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post._id} post={post} userDetails={userDetails} />
      ))}
    </div>
  );
};

export default PostFeed;