"use client"
import { useState } from "react"
import { Camera, LinkIcon, Mail, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PostFeed } from "@/components/post-feed"

// This would come from your auth/database in a real app
const userData = {
  username: "jane_smith",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  bio: "Traveler, photographer, and nature lover.",
  address: "456 Oak Ave, Anytown",
  website: "https://www.janesmith.photography",
  imageUrl: "/placeholder.svg?height=300&width=300",
  followers: [],
  following: [],
  saved_posts: [],
}

export default function ProfilePage() {
  const [user, setUser] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // In a real app, you would upload this to your server/cloud storage
      const imageUrl = URL.createObjectURL(file)
      setUser((prev) => ({ ...prev, imageUrl }))
      setEditedUser((prev) => ({ ...prev, imageUrl }))
    }
  }

  const handleSave = () => {
    // In a real app, you would send this to your server
    setUser(editedUser)
    setIsEditing(false)
  }

  return (
    (<div className="container max-w-4xl space-y-8 py-8">
      <Card>
        {/* Cover Photo Area */}
        <div className="relative h-48 bg-muted">
          <div className="absolute -bottom-12 left-8 flex items-end space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                onClick={() => document.getElementById("profile-image").click()}>
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload} />
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </div>

        <CardContent className="mt-16 space-y-6">
          {/* User Information */}
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedUser.bio}
                  onChange={(e) => setEditedUser((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={editedUser.website}
                  onChange={(e) => setEditedUser((prev) => ({ ...prev, website: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Location</Label>
                <Input
                  id="address"
                  value={editedUser.address}
                  onChange={(e) => setEditedUser((prev) => ({ ...prev, address: e.target.value }))} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">{user.bio}</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                {user.website && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline">
                      {user.website}
                    </a>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {user.address}
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{user.followers.length}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{user.following.length}</span> following
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* User Posts */}
      <div className="space-y-4">
        <CardTitle>Posts</CardTitle>
        <PostFeed userPosts={true} />
      </div>
    </div>)
  );
}

