"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { date } from "yup";

const socket = io("http://localhost:8080");

const MessagePage = () => {
  const [following, setFollowing] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessagesInput] = useState("");
  const { userDetails } = useSelector((state) => state.user);
  const handleFollowing = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/following/${userDetails?.user?._id}`
    );
    if (data) {
      setFollowing(data.following);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    socket.emit("sendMsg", messageInput);
  };

  useEffect(() => {
    handleFollowing();
  }, []);

  useEffect(() => {
    socket.on("connection");
   
  }, []);

  useEffect (()=> {
    socket.on("recieveMsg", (msg) => {
      setMessages((prev) => [...prev, msg]);
      //console.log(messages);
    });
  }, [messages])

  return (
    <div className="container max-w-6xl py-6">
      {JSON.stringify(messages)}
      <Card className="flex h-[80vh] border-none bg-blue-100 shadow-md">
        {/* Chat List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Messages</h2>
            <p className="text-sm text-muted-foreground">
              Chat with people you follow
            </p>
          </div>
          <ScrollArea className="h-[calc(80vh-65px)]">
            <div className="space-y-2 p-4">
              {following?.length > 0 ? (
                following?.map((user) => (
                  <button
                    key={user?._id}
                    onClick={() => {
                      setSelectedChat(user);
                    }}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg bg-blue-300 transition-colors"
                  }`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_API_URL}/static/avatars/${user?.avatar}`}
                        alt={user?.username}
                      />
                      <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{user?.username}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Follow some users to start chatting!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={null} alt={selectedChat?.username} />
                    <AvatarFallback>{selectedChat?.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChat?.username} </h3>
                    {/* <p className="text-sm text-muted-foreground">
                    {onlineUsers.includes(selectedChat.id) ? "Online" : "Offline"}
                  </p> */}
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages?.length > 0 ? (
                    messages?.map((message) => (
                      <div>
                        <p>{message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  )}
                  <div />
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessagesInput(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-semibold mb-1">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Choose someone from your following list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MessagePage;

//add tiptap editor
