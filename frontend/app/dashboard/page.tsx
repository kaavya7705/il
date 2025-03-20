"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Calendar, User, Building, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import GovernmentSchemeCard from "@/components/government-scheme-card"

// Mock data
const mockMentor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  title: "Senior Product Manager at TechCorp",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "15+ years of experience in product management and technology leadership. Passionate about helping new entrepreneurs navigate the tech industry.",
  skills: ["Product Management", "Leadership", "Technology", "Entrepreneurship"],
  matchPercentage: 92,
}

const mockSchemes = [
  {
    id: "1",
    title: "Startup India Seed Fund",
    description: "Financial assistance for startups in the ideation and commercialization phase.",
    category: "Funding",
    eligibility: "Early-stage technology startups",
    deadline: "June 30, 2025",
    amount: "Up to $50,000",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Digital Innovation Program",
    description: "Support for digital transformation projects and innovative tech solutions.",
    category: "Technology",
    eligibility: "SMEs in the technology sector",
    deadline: "August 15, 2025",
    amount: "Up to $75,000",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Women Entrepreneurship Platform",
    description: "Comprehensive support for women-led businesses including mentorship and funding.",
    category: "Entrepreneurship",
    eligibility: "Women-owned businesses",
    deadline: "Ongoing",
    amount: "Varies",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Dashboard() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mentors">Mentors</TabsTrigger>
              <TabsTrigger value="schemes">Government Schemes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Welcome back!</CardTitle>
                    <CardDescription>Here's an overview of your mentorship journey.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Profile Completion</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Upcoming Session</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Tuesday, 2:00 PM with Dr. Sarah Johnson
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Recent Activity</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            3 messages received in the last 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Matched Mentor</CardTitle>
                    <CardDescription>Based on your profile, we've found the perfect mentor for you.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={mockMentor.avatar} alt={mockMentor.name} />
                          <AvatarFallback>
                            {mockMentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{mockMentor.name}</h3>
                          <Badge variant="outline" className="md:ml-2 w-fit">
                            {mockMentor.matchPercentage}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{mockMentor.title}</p>
                        <p className="mb-4">{mockMentor.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {mockMentor.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/chat">
                        <MessageSquare className="mr-2 h-4 w-4" /> Start Conversation
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Government Schemes</CardTitle>
                    <CardDescription>Programs and funding opportunities relevant to your industry.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {mockSchemes.slice(0, 2).map((scheme) => (
                        <GovernmentSchemeCard key={scheme.id} scheme={scheme} />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => (document.querySelector('[data-value="schemes"]') as HTMLElement)?.click()}
                      >
                      View All Schemes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mentors">
              <Card>
                <CardHeader>
                  <CardTitle>Your Mentor Match</CardTitle>
                  <CardDescription>
                    Connect with your matched mentor and explore other potential mentors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="p-6 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={mockMentor.avatar} alt={mockMentor.name} />
                            <AvatarFallback>
                              {mockMentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{mockMentor.name}</h3>
                            <Badge className="md:ml-2 w-fit bg-blue-600">Primary Mentor</Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{mockMentor.title}</p>
                          <p className="mb-4">{mockMentor.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {mockMentor.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild>
                              <Link href="/chat">
                                <MessageSquare className="mr-2 h-4 w-4" /> Message
                              </Link>
                            </Button>
                            <Button variant="outline">
                              <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mt-4">Other Potential Mentors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-4 border rounded-lg">
                          <div className="flex gap-4">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=100&width=100`} />
                              <AvatarFallback>MN</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">Mentor Name {i}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Position at Company</p>
                              <Badge variant="outline" className="mt-2">
                                78% Match
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schemes">
              <Card>
                <CardHeader>
                  <CardTitle>Government Schemes</CardTitle>
                  <CardDescription>Explore funding and support programs relevant to your industry.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    {mockSchemes.map((scheme) => (
                      <GovernmentSchemeCard key={scheme.id} scheme={scheme} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Resources</CardTitle>
                  <CardDescription>Curated content to help you grow professionally.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
                        <div className="relative h-40">
                          <Image
                            src={`/placeholder.svg?height=300&width=500`}
                            alt="Resource thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Resource Title {i}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            A brief description of this resource and what you can learn from it.
                          </p>
                          <Button variant="outline" size="sm">
                            View Resource
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/placeholder.svg?height=100&width=100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Profile Completion: {progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />

                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Industry: Technology</span>
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Primary Skill: Programming</span>
                </div>

                <div>
                  <p className="text-sm mb-2">Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">AI</Badge>
                    <Badge variant="outline">Web Development</Badge>
                    <Badge variant="outline">Entrepreneurship</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Tuesday, 2:00 PM</span>
                  </div>
                  <p className="text-sm mb-1">Mentorship Session with Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500">30 minutes</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Friday, 11:00 AM</span>
                  </div>
                  <p className="text-sm mb-1">Group Workshop: Entrepreneurship Basics</p>
                  <p className="text-xs text-gray-500">60 minutes</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Schedule New Session
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

