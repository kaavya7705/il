"use client"

import type React from "react"
import type { ReactNode } from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { SendIcon, Bot, User, Globe, MoreHorizontal, Copy, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-bold mt-2 text-2xl text-purple-700">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-bold mt-2 text-xl text-purple-600">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-bold mt-2 text-lg text-purple-500">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-bold mt-2 text-base text-purple-400">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mt-2 text-base text-gray-600">{children}</p>
  ),

};

// Define message type
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Update the sendMessageToAPI function to handle the new response format
async function sendMessageToAPI(message: string, language: string) {
  try {
    const response = await axios.post("http://localhost:5000/chat", {
      query: message,
      language: language,
    });

    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your entrepreneurship assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Languages available
  const languages = [
    { value: "en", label: "English", flag: "US" },
    { value: "hi", label: "Hindi", flag: "IN" },
    { value: "pb", label: "Punjabi", flag: "IN" },
    { value: "es", label: "Spanish", flag: "ES" },
    { value: "ta", label: "Tamil", flag: "IN" },
    { value: "fr", label: "French", flag: "FR" },
    { value: "ma", label: "Malyalam", flag: "IN" },
  ]

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Update the handleSendMessage function to handle the new response format
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get response from API
      const response = await sendMessageToAPI(input, language);

      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: typeof response === "string" ? response : JSON.stringify(response),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focus back on input after response
      inputRef.current?.focus();
    }
  };

  // Copy message to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Get language flag
  const getLanguageFlag = (code: string) => {
    return languages.find((lang) => lang.value === code)?.flag || "🌐"
  }

  // Update the return JSX to change the styling and alignment
  return (
    <div className="flex flex-col h-[600px] rounded-xl border shadow-lg bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-xl">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 bg-white/20 border-2 border-white/50">
            <AvatarFallback className="bg-white text-violet-700">
              <Bot size={18} />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">AI Assistant</h3>
            <p className="text-xs text-white/80">Powered by AI Technology</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 bg-white/10 text-white border-white/20">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-xs">Online</span>
          </Badge>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  <Globe className="h-4 w-4 text-white" />
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[120px] border-none bg-transparent shadow-none h-7 p-0 text-white">
                      <SelectValue placeholder="Select Language">
                        <span className="flex items-center gap-1">
                          <span>{getLanguageFlag(language)}</span>
                          <span>{languages.find(l => l.value === language)?.label}</span>
                        </span>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "group flex gap-3", 
                message.role === "user" ? "justify-end" : ""
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mt-1 border-2 border-violet-200">
                  <AvatarFallback className="bg-violet-600 text-white">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn(
                "flex flex-col max-w-[75%]",
                message.role === "user" ? "items-end" : "items-start"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">
                    {message.role === "assistant" ? "Assistant" : "You"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div className="flex group">
                  <Card
                    className={cn(
                      "shadow-md border-0",
                      message.role === "user" 
                        ? "bg-white text-white rounded-tr-none" 
                        : "bg-white rounded-tl-none"
                    )}
                  >
                    <CardContent className="p-3">
                      <div className={message.role === "user" ? "text-white" : ""}>
                        <ReactMarkdown
                          // remarkPlugins={[remarkGfm]}
                          components={components}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className={cn(
                    "opacity-0 group-hover:opacity-100 transition-opacity flex items-start",
                    message.role === "user" ? "mr-2 order-first" : "ml-2"
                  )}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={message.role === "user" ? "start" : "end"}>
                        <DropdownMenuItem onClick={() => copyToClipboard(message.content)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy text
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 mt-1 border-2 border-violet-200">
                  <AvatarFallback className="bg-purple-600 text-white">
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-1 border-2 border-violet-200">
                <AvatarFallback className="bg-violet-600 text-white">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Assistant
                </span>
                <Card className="bg-white shadow-md border-0 rounded-tl-none">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 rounded-full bg-violet-600 animate-bounce"></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white rounded-b-xl">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1 border-2 border-violet-200 focus-visible:ring-violet-300 shadow-sm"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-sm hover:shadow-md transition-all hover:opacity-90"
                >
                  <SendIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMessages([
                      {
                        id: "welcome",
                        role: "assistant",
                        content: "Hello! I'm your entrepreneurship assistant. How can I help you today?",
                        timestamp: new Date(),
                      },
                    ]);
                  }}
                  className="border-violet-200 text-violet-700 hover:bg-violet-50 shadow-sm hover:shadow-md transition-all"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Reset chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset conversation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>
    </div>
  )
}