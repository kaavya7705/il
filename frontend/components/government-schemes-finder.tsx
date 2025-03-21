"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, Building, CreditCard, CheckCircle2, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Server action to search for government schemes
import axios from "axios";

async function searchGovernmentSchemes(industry: string) {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/api/schemes`, {
      params: { industry },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return { error: "Failed to fetch schemes. Please try again." };
  }
}

// Function to parse schemes from the AI response
function parseSchemes(aiResponse: string) {
  // This is a simple parser that tries to identify schemes in the AI response
  // In a production app, you'd want a more structured response from the API

  const schemes = []

  // Split by double newlines to separate potential schemes
  const paragraphs = aiResponse.split("\n\n")

  for (const paragraph of paragraphs) {
    if (paragraph.includes("Scheme") || paragraph.includes("Program") || paragraph.includes("Initiative")) {
      // Try to extract a title
      const titleMatch = paragraph.match(/^(.*?)(Scheme|Program|Initiative|Fund)/i)
      const title = titleMatch ? titleMatch[0].trim() : "Government Scheme"

      // Extract eligibility if mentioned
      const eligibilityMatch = paragraph.match(/eligibility:?\s*(.*?)(\.|\n|$)/i)
      const eligibility = eligibilityMatch ? eligibilityMatch[1].trim() : "Various businesses"

      // Extract benefits if mentioned
      const benefitsMatch = paragraph.match(/benefits:?\s*(.*?)(\.|\n|$)/i)
      const benefits = benefitsMatch ? benefitsMatch[1].trim() : paragraph.substring(0, 100) + "..."

      schemes.push({
        title,
        description: paragraph,
        eligibility,
        benefits,
      })
    }
  }

  // If no schemes were identified, create a generic one with the full response
  if (schemes.length === 0 && aiResponse.length > 0) {
    schemes.push({
      title: "Available Schemes",
      description: aiResponse,
      eligibility: "See details",
      benefits: "Multiple benefits available",
    })
  }

  return schemes
}

export default function GovernmentSchemesFinder() {
  const [industry, setIndustry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [parsedSchemes, setParsedSchemes] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!industry.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await searchGovernmentSchemes(industry)

      if (result.error) {
        setError(result.error)
        setSearchResults(null)
        setParsedSchemes([])
      } else {
        setSearchResults(result)

        // Parse the AI response to extract schemes
        const schemes = parseSchemes(result.schemes)
        setParsedSchemes(schemes)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setSearchResults(null)
      setParsedSchemes([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Enter your industry (e.g., technology, agriculture, textiles)"
            className="pl-10 border-2 focus-visible:ring-secondary/30 shadow-sm"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !industry.trim()}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md transition-all"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
          Search
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="border-0 shadow-sm">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-muted/50 rounded-lg">
          <Loader2 className="h-12 w-12 animate-spin mb-6 text-secondary" />
          <p className="text-lg font-medium text-gray-700">Searching for government schemes...</p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            This may take a moment as we analyze the latest information for your industry
          </p>
        </div>
      )}

      {!isLoading && parsedSchemes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <FileText className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-medium">
              Found {parsedSchemes.length} scheme{parsedSchemes.length !== 1 ? "s" : ""} for {industry}
            </h3>
          </div>

          {parsedSchemes.map((scheme, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-primary">{scheme.title}</h4>
                    <Badge className="ml-2 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-0">
                      <Building className="h-3 w-3 mr-1" />
                      {industry}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 p-3 bg-success/10 rounded-md">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span className="text-sm">
                        <strong>Eligibility:</strong> {scheme.eligibility}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-md">
                      <CreditCard className="h-5 w-5 text-secondary-foreground" />
                      <span className="text-sm">
                        <strong>Benefits:</strong> {scheme.benefits}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-md border border-gray-100">
                    <p className="text-sm whitespace-pre-wrap">{scheme.description}</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 border-primary/20"
                    >
                      View Full Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !error && searchResults && parsedSchemes.length === 0 && (
        <div className="text-center py-12 px-4 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium text-gray-700">No specific schemes found for "{industry}".</p>
          <p className="text-sm text-gray-500 mt-2">Try a different industry or more specific terms.</p>
        </div>
      )}
    </div>
  )
}

