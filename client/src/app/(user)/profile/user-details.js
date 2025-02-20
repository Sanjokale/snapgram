import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Link2Icon, LinkIcon, Mail, MapPin } from 'lucide-react'
import React, { useState } from 'react'

const Details = ({user, currentProfileDetails, setCurrentProfileDetails}) => {
    const [isEditing, setIsEditing] = useState(false)
  return (
    
       <div className="mt-16 p-2 space-y-6 ">
          {/* User Information */}
          {isEditing ? (
            <div className="space-y-4 max-w-[50%]">
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
               
               
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                 
                  
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Location</Label>
                <Input
                  id="address"
                
                  
                />
              </div>
              <div className="flex gap-2">
                <Button >Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">{currentProfileDetails?.bio}</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {currentProfileDetails?.email}
                </div>
                {currentProfileDetails?.website && (
                  <div className="flex items-center gap-2">
                    <Link2Icon className="h-4 w-4" />
                    <a href={currentProfileDetails?.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {currentProfileDetails?.website}
                    </a>
                  </div>
                )}
                {currentProfileDetails?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {currentProfileDetails?.address}
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{currentProfileDetails?.followers?.length}</span> followers
                </div>
                <div>
                  <span className="font-semibold">{currentProfileDetails?.following?.length}</span> following
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
              <Button variant="outline" className=" m-2 bg-blue-100  hover:bg-blue-300"  onClick={() => setIsEditing(true)}>
                Follow
              </Button>
            </div>
          )}
        </div>
    
  )
}

export default Details
