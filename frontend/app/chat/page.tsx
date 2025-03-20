"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, MoreVertical, ArrowLeft } from "lucide-react"
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

    // Simulate mentor response after a delay
    setTimeout(() => {
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
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback>
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{mentor.name}</h2>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              <div className="flex items-end gap-2 max-w-[80%]">
                {message.sender === "mentor" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg p-3",
                    message.sender === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border",
                  )}
                >
                  <p>{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400",
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t p-4 bg-white dark:bg-gray-950">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

