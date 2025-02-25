"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { UserCard } from "@/components/user-card";

// Mock data - in a real app, this would come from your backend

export default function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersDialogOpen, setFollowersDialogOpen] = useState(false);
  const [followingDialogOpen, setFollowingDialogOpen] = useState(false);

  const { userDetails } = useSelector((state) => state.user);

  const fetchUser = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/following/${userDetails?.user?._id}`
    );
    setFollowing(data.following);

    const { data: followersList } = await axios.get(
      `http://localhost:8080/followers/${userDetails?.user?._id}`
    );
    setFollowers(followersList?.followers);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <Button
          className=" bg-blue-200 gap-2 text-black hover:bg-blue-400 "
          onClick={() => setFollowersDialogOpen(true)}
        > Followers</Button>

        <Button
          className=" bg-blue-200 text-black hover:bg-blue-400"
          onClick={() => setFollowingDialogOpen(true)}
        > following</Button>
      </div>

      {/* Followers Dialog */}
      <Dialog open={followersDialogOpen} onOpenChange={setFollowersDialogOpen}>
        <DialogContent className="sm:max-w-md mt-2">
          <DialogTitle></DialogTitle>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {followers?.length > 0 ? (
              followers.map((follower) => (
                <UserCard key={follower._id} user={follower} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                You don't have any followers yet.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Following Dialog */}
      <Dialog open={followingDialogOpen} onOpenChange={setFollowingDialogOpen}>
        <DialogContent className="sm:max-w-md mt-2">
          <DialogTitle></DialogTitle>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {following?.length > 0 ? (
              following?.map((user) => <UserCard key={user?._id} user={user} />)
            ) : (
              <p className="text-center text-muted-foreground py-4">
                You're not following anyone yet.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
