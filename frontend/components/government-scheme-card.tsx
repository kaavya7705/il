import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Building } from "lucide-react"
import Image from "next/image"

interface Scheme {
  id: string
  title: string
  description: string
  category: string
  eligibility: string
  deadline: string
  amount: string
  image: string
}

interface GovernmentSchemeCardProps {
  scheme: Scheme
}

export default function GovernmentSchemeCard({ scheme }: GovernmentSchemeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
          <Image src={scheme.image || "/placeholder.svg"} alt={scheme.title} fill className="object-cover" />
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold">{scheme.title}</h3>
              <Badge variant="outline" className="mt-1">
                {scheme.category}
              </Badge>
            </div>
            <Badge className="mt-2 md:mt-0 w-fit">{scheme.amount}</Badge>
          </div>

          <p className="text-gray-600 dark:text-gray-400 my-4">{scheme.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{scheme.eligibility}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Deadline: {scheme.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{scheme.amount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button>Apply Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

