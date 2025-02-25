"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
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
    <div className="container max-w-2xl py-8">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Connections</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="flex items-center justify-center gap-2 h-24"
              onClick={() => setFollowersDialogOpen(true)}
            >
              <Users className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-medium">Followers</span>
                <span className="text-sm">{followers?.length} people</span>
              </div>
            </Button>

            <Button
              size="lg"
              className="flex items-center justify-center gap-2 h-24"
              onClick={() => setFollowingDialogOpen(true)}
            >
              <UserPlus className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className="text-lg font-medium">Following</span>
                <span className="text-sm">{following?.length} people</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Followers Dialog */}
      <Dialog open={followersDialogOpen} onOpenChange={setFollowersDialogOpen}>
      
        <DialogContent className="sm:max-w-md mt-2">
        <DialogTitle></DialogTitle>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {followers?.length > 0 ? (
              followers.map((follower) => (
                <UserCard
                  key={follower._id}
                  userDetails={userDetails}
                  user={follower}
                />
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
              following?.map((user) => (
                <UserCard
                  userDetails={userDetails}
                  key={user?._id}
                  user={user}
                />
              ))
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
