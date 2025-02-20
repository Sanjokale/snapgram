"use client";
import { useSelector } from "react-redux";
import Header from "../header";
import { toast, useToast } from "@/hooks/use-toast";
import { setUserDetails } from "@/redux/slices/userSlice";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Details from "../user-details";
import { Card, CardTitle } from "@/components/ui/card";
import PostFeed from "@/components/post-feed";
const Profile = () => {
  // This would come from your auth/database in a real app

  const { userDetails } = useSelector((state) => state.user);

  const [isUploading, setIsUploading] = useState(false);
  const [currentProfileDetails, setCurrentProfileDetails] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    try {
      setIsUploading(true);
      const { data } = await axios.post(
        `http://localhost:8080/upload-avatar/${userDetails.user._id}`,
        formData
      );

      if (data) {
        toast({
          title: data.msg,
        });
      }
      dispatch(setUserDetails(data));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.msg || "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getCurrentProfileDetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/user/" + params.id
      );
      setCurrentProfileDetails(data);
    } catch {}
  };

  useEffect(() => {
    getCurrentProfileDetails();
  }, []);

  return (
    <>
      <div className="rounded-md shadow-md ">
        <Header
          handleImageUpload={handleImageUpload}
          isUploading={isUploading}
          currentProfileDetails={currentProfileDetails}
          userDetails={userDetails}
          params={params}
        />
        <Details
          currentProfileDetails={currentProfileDetails}
          setCurrentProfileDetails={setCurrentProfileDetails}
        />
      </div>
      {/* User Posts */}
      <div className=" max-w-[70%] mt-4">
        <CardTitle>My Posts</CardTitle>
        <PostFeed userId={params?.id} />
      </div>
    </>
  );
};

export default Profile;
