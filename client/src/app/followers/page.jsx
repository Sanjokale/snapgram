"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/user-card"

// Mock data - in a real app, this would come from your backend
const initialFollowers = [
  {
    id: "1",
    name: "Sarah Wilson",
    username: "sarahw",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Mike Johnson",
    username: "mikej",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: false,
  },
  {
    id: "3",
    name: "Emily Davis",
    username: "emilyd",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
]

const initialFollowing = [
  {
    id: "4",
    name: "Alex Thompson",
    username: "alext",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "5",
    name: "Jessica Brown",
    username: "jessb",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
  {
    id: "6",
    name: "David Miller",
    username: "davidm",
    imageUrl: "/placeholder.svg?height=40&width=40",
    isFollowing: true,
  },
]

export default function FollowersPage() {
  const [followers, setFollowers] = useState(initialFollowers)
  const [following, setFollowing] = useState(initialFollowing)

  const handleToggleFollow = (userId) => {
    // Update followers list
    setFollowers(followers.map((follower) =>
      follower.id === userId ? { ...follower, isFollowing: !follower.isFollowing } : follower))

    // Update following list
    setFollowing(following.map(
      (user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)
    ))
  }

  return (
    (<div className="container max-w-2xl py-8">
      <Tabs defaultValue="followers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
          <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="followers" className="mt-6 space-y-4">
          {followers.map((follower) => (
            <UserCard key={follower.id} user={follower} onToggleFollow={handleToggleFollow} />
          ))}
        </TabsContent>
        <TabsContent value="following" className="mt-6 space-y-4">
          {following.map((user) => (
            <UserCard key={user.id} user={user} onToggleFollow={handleToggleFollow} />
          ))}
        </TabsContent>
      </Tabs>
    </div>)
  );
}

