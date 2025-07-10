"use client"

import type React from "react"

import axios from 'axios';
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2, Sparkles, MessageCircle } from "lucide-react"

export default function ChatPage() {
  
  type MessageType = {
    role: "user" | "system";
    content: string;
  };
  const [isLoading,setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  let [messagesHistory, setMessagesHistory] = useState<MessageType[]>([])
  const [message,setMessage] = useState("");
  let id = 1;
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  useEffect(() => {
    scrollToBottom()
  }, [messagesHistory])

  useEffect(() => {
    setIsTyping(isLoading)
  }, [isLoading])
  
 

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return
    // handleSubmit(e)
  }

  const handleClick = async () => {
      try {
        setIsLoading(true)
        let data:any = [...messagesHistory,{role:"user",content:message}]
        // setMessagesHistory(data)
        setMessage("");
        
        // alert(JSON.stringify(messagesHistory))
        const res = await axios.post('http://localhost:4000/api/v1/chat', {
          messagesHistory: data,
        });
        data.push({role:"system",content:res.data.system})
        setMessagesHistory(data)
        // alert(JSON.stringify(messagesHistory))
        
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.error('API Error:', err);
      }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.1) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-4xl mx-auto h-screen flex flex-col">
        <Card className="flex-1 flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
            <CardTitle className="relative flex items-center gap-3 text-xl font-semibold">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Chat Assistant</h1>
                <p className="text-sm text-white/80 font-normal">Powered by GPT-4 with Langchain</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 bg-gradient-to-b from-gray-50 to-white">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messagesHistory.length === 0 && (
                  <div className="text-center mt-12">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <MessageCircle className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Rupesh AI Chat Screen!</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Start a conversation with our intelligent AI assistant. Ask questions, get help, or just have a
                      friendly chat.
                    </p>
                  </div>
                )}

                {messagesHistory.map((message, index) => (
                  <div
                   key = {++id}
                    className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {message.role === "system" && (
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-white shadow-lg">
                        <AvatarFallback className="bg-transparent">
                          <Bot className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-200"
                          : "bg-white border border-gray-200 text-gray-800 shadow-gray-100"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white shadow-lg">
                        <AvatarFallback className="bg-transparent">
                          <User className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-white shadow-lg">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-6">
              <form onSubmit={onSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                    className="pr-12 h-12 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-violet-500/20 bg-white shadow-sm"
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  onClick={handleClick}
                  disabled={isLoading || !message.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-violet-200 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Press Enter to send • Powered by OpenAI
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
