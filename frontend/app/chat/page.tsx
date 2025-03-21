"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, MoreVertical, ArrowLeft, Phone, Video } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "mentor"
  timestamp: Date
}

// Mock mentor data
const mentor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  avatar: "/placeholder.svg?height=200&width=200",
  status: "online",
  specialty: "Career Development",
}

// Initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm Dr. Sarah Johnson, your matched mentor. How can I help you today?",
    sender: "mentor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate mentor response after a delay
    setTimeout(() => {
      setIsTyping(false)

      const mentorResponses = [
        "That's a great question! Let me help you with that.",
        "I understand your concern. Based on my experience, I would recommend...",
        "I've faced similar challenges in my career. Here's what worked for me...",
        "Let's break this down into manageable steps. First, you should...",
        "Have you considered approaching this from a different angle?",
      ]

      const randomResponse = mentorResponses[Math.floor(Math.random() * mentorResponses.length)]

      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "mentor",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, mentorMessage])
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#f9fafb] ">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white  shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="md:hidden text-[#4b5563] ">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Avatar className="h-12 w-12 border-2 border-[#facc15]">
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback className="bg-[#16a34a] text-white">
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg text-[#111827] ">{mentor.name}</h2>
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e] mr-2"></div>
              <span className="text-xs text-[#4b5563] ">{mentor.specialty} • Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#16a34a] hover:text-[#15803d] hover:bg-[#dcfce7] "
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#16a34a] hover:text-[#15803d] hover:bg-[#dcfce7] "
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#4b5563]  hover:bg-[#f3f4f6] "
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{
          background: "linear-gradient(to bottom, #fefce8 0%, #f0fdf4 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Date separator */}
          <div className="flex justify-center">
            <div className="bg-white  px-4 py-1 rounded-full text-xs text-[#6b7280]  shadow-sm">
              {formatDate(messages[0].timestamp)}
            </div>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              <div className="flex items-end gap-2 max-w-[80%]">
                {message.sender === "mentor" && (
                  <Avatar className="h-8 w-8 border-2 border-[#facc15]">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback className="bg-[#16a34a] text-white">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-2xl p-3.5 shadow-sm",
                    message.sender === "user"
                      ? "bg-[#16a34a] text-white rounded-tr-none"
                      : "bg-white  rounded-tl-none border border-[#f3f4f6] ",
                  )}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1 text-right",
                      message.sender === "user" ? "text-[#bbf7d0]" : "text-[#6b7280] ",
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 border-2 border-[#22c55e]">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" />
                    <AvatarFallback className="bg-[#eab308] text-white">JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8 border-2 border-[#facc15]">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback className="bg-[#16a34a] text-white">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white  rounded-2xl rounded-tl-none p-4 shadow-sm border border-[#f3f4f6] ">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-[#9ca3af]  rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-[#9ca3af]  rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-[#9ca3af]  rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t p-4 bg-white ">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-[#6b7280] hover:text-[#ca8a04] hover:bg-[#fef9c3] "
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border-[#e5e7eb]  focus-visible:ring-[#16a34a] bg-[#f9fafb] "
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white"
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

