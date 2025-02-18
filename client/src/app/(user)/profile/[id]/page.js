"use client";
import { useSelector } from "react-redux";
import Header from "../header";
import { toast, useToast } from "@/hooks/use-toast";
import { setUserDetails } from "@/redux/slices/userSlice";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { userDetails } = useSelector((state) => state.user);
 

  const [isUploading, setIsUploading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleImageUpload = async (e) => {
    
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    try {
      setIsUploading(true);
      const { data } = await axios.post(
        `http://localhost:8080/upload-avatar/${params.id}`,
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

  return (
    <>
      <Header handleImageUpload={handleImageUpload} isUploading={isUploading} userDetails= {userDetails} />
    </>
  );
};

export default Profile;
