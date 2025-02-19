"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, User } from "lucide-react";

const Header = ({handleImageUpload, isUploading, userDetails}) => {

  
  return (
    <div className="relative h-48 bg-blue-200 rounded-t-md">
      <div className="absolute -bottom-12 left-8 flex items-end space-x-4">
        <div className="relative">
          <label
            htmlFor="profile-upload"
            className="relative cursor-pointer group"
          >
            <Avatar className="w-32 h-32 transition-all duration-200 group-hover:ring-4 group-hover:ring-offset-2 group-hover:ring-primary/20">
              <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${userDetails?.user?.avatar}`} alt="Profile picture" />
              <AvatarFallback className="bg-muted">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                ) : (
                  <Camera className="w-8 h-8 text-muted-foreground" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{userDetails?.user?.username}</h2>
          <p className="text-muted-foreground">@{userDetails?.user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
