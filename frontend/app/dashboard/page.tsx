"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ChatbotInterface from "@/components/chatbot-interface"
import GovernmentSchemesFinder from "@/components/government-schemes-finder"
import MentorMatching from "@/components/mentor-matching"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-8">Entrepreneur Support Hub</h1>

      <Tabs defaultValue="chatbot" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
          <TabsTrigger value="mentors">Mentor Matching</TabsTrigger>
        </TabsList>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Entrepreneurship Assistant</CardTitle>
              <CardDescription>Get personalized guidance and answers to your business questions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatbotInterface />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes">
          <Card>
            <CardHeader>
              <CardTitle>Government Schemes Finder</CardTitle>
              <CardDescription>Discover funding and support programs relevant to your industry</CardDescription>
            </CardHeader>
            <CardContent>
              <GovernmentSchemesFinder />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Matching</CardTitle>
              <CardDescription>
                Connect with experienced mentors who can guide your entrepreneurial journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MentorMatching />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

