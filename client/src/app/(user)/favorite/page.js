"use client";

import { useSelector, useDispatch } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { Post } from "@/components/post";

export default function SavedPostsPage() {
  const { savePost } = useSelector((state) => state?.post);



  return (
    <div className="container max-w-3xl py-8">
      <Card className="mb-6 border-none bg-blue-100">
        <CardHeader className="flex flex-row items-center gap-2">
          <Bookmark className="h-5 w-5" />
          <CardTitle>Saved Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {savePost?.length > 0
              ? `You have ${savePost?.length} saved post${
                  savePost.length !== 1 ? "s" : ""
                }.`
              : "You haven't saved any posts yet."}
          </p>
        </CardContent>
      </Card>

      {savePost?.length > 0 ? (
        <div className="space-y-6">
          {savePost?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No saved posts</h3>
          <p className="text-muted-foreground">
            When you save posts, they'll appear here for easy access.
          </p>
        </div>
      )}
    </div>
  );
}
