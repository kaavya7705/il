"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

type TestimonialCardProps = {
  quote: string
  author: string
  position: string
  image: string
  delay: number
}

export default function TestimonialCard({ quote, author, position, image, delay }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <QuoteIcon className="h-8 w-8 text-green-200 mb-4" />
          <p className="text-gray-700 mb-6">{quote}</p>
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-semibold text-black">{author}</h4>
              <p className="text-sm text-gray-600">{position}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

