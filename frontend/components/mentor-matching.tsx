"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Calendar, Filter, Briefcase, Award, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Mock data for mentors
const mockMentors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Senior Production Manager at Ethiopian Textile Corporation",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "15+ years of experience in textile manufacturing and quality control. Specialized in cotton processing and fabric development. Passionate about helping new entrepreneurs navigate the textile industry.",
    skills: ["Textile Manufacturing", "Quality Control", "Production Management", "Supply Chain"],
    matchPercentage: 92,
    industry: "Textile Manufacturing",
    availability: "High",
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Founder & CEO at TextileTech Ventures",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Serial entrepreneur with expertise in textile exports and international trade. Successfully established multiple textile manufacturing units across Africa.",
    skills: ["Textile Exports", "Business Strategy", "International Trade", "Manufacturing"],
    matchPercentage: 85,
    industry: "Textile Export",
    availability: "Medium",
  },
  {
    id: "3",
    name: "Priya Sharma",
    title: "Marketing Director at Global Textile Brands",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Textile marketing specialist with deep understanding of African and global markets. Helps startups build effective branding and market entry strategies.",
    skills: ["Textile Marketing", "Brand Development", "Market Research", "Trade Shows"],
    matchPercentage: 78,
    industry: "Textile Marketing",
    availability: "High",
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Textile Industry Consultant & Investor",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Former textile plant manager turned industry consultant. Provides guidance on factory setup, equipment selection, and operational efficiency in textile manufacturing.",
    skills: ["Factory Setup", "Equipment Selection", "Process Optimization", "Cost Management"],
    matchPercentage: 70,
    industry: "Textile Consulting",
    availability: "Low",
  },
]

// Industry options
const industries = [
  { value: "all", label: "All Industries" },
  { value: "textile-manufacturing", label: "Textile Manufacturing" },
  { value: "textile-export", label: "Textile Export" },
  { value: "textile-marketing", label: "Textile Marketing" },
  { value: "textile-consulting", label: "Textile Consulting" },
]

export default function MentorMatching() {
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [minMatchPercentage, setMinMatchPercentage] = useState(60)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

  // Filter mentors based on selected filters
  const filteredMentors = mockMentors.filter((mentor) => {
    // Filter by industry
    if (selectedIndustry !== "all" && mentor.industry.toLowerCase() !== selectedIndustry.toLowerCase()) {
      return false
    }

    // Filter by match percentage
    if (mentor.matchPercentage < minMatchPercentage) {
      return false
    }

    // Filter by availability
    if (showOnlyAvailable && mentor.availability === "Low") {
      return false
    }

    return true
  })

  // Sort mentors by match percentage (highest first)
  const sortedMentors = [...filteredMentors].sort((a, b) => b.matchPercentage - a.matchPercentage)

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Find Your Perfect Mentor</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-primary" />
                Industry
              </Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger id="industry" className="bg-white shadow-sm border-2 border-gray-100">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Award className="h-4 w-4 text-secondary" />
                Minimum Match: {minMatchPercentage}%
              </Label>
              <div className="pt-2">
                <Slider
                  value={[minMatchPercentage]}
                  onValueChange={(value) => setMinMatchPercentage(value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="[&>.data-[state=active]:bg-secondary] [&>.data-[state=active]:border-secondary]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="availability"
                checked={showOnlyAvailable}
                onCheckedChange={setShowOnlyAvailable}
                className="data-[state=checked]:bg-success"
              />
              <Label htmlFor="availability" className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-success" />
                Show only highly available mentors
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {sortedMentors.length === 0 ? (
        <div className="text-center py-12 px-4 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium text-gray-700">No mentors match your current filters.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sortedMentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="overflow-hidden border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center
                            ${
                              mentor.availability === "High"
                                ? "bg-success text-white"
                                : mentor.availability === "Medium"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-destructive text-white"
                            }`}
                        >
                          <Clock className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">{mentor.name}</h3>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-secondary p-[1px] rounded-full">
                          <Badge variant="outline" className="bg-white border-0 text-primary font-medium">
                            {mentor.matchPercentage}% Match
                          </Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className={`border-0 font-medium
                            ${
                              mentor.availability === "High"
                                ? "bg-success/10 text-success"
                                : mentor.availability === "Medium"
                                  ? "bg-secondary/10 text-secondary-foreground"
                                  : "bg-destructive/10 text-destructive"
                            }`}
                        >
                          {mentor.availability} Availability
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{mentor.title}</p>

                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Match Score</span>
                        <span className="font-medium">{mentor.matchPercentage}%</span>
                      </div>
                      <Progress
                        value={mentor.matchPercentage}
                        className={`h-2 bg-gray-100 [&>[role=progressbar]]:${
                          mentor.matchPercentage > 80
                            ? "bg-success"
                            : mentor.matchPercentage > 60
                              ? "bg-secondary"
                              : "bg-orange-500"
                        }`}
                      />
                    </div>

                    <p className="mb-4">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 border-0"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="shadow-sm hover:shadow-md transition-all">
                        <Link href="/chat">
                          <MessageSquare className="mr-2 h-4 w-4" /> Message
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary/20 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

