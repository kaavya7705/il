"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  image: string
  delay: number
}

export default function TestimonialCard({ quote, author, position, image, delay }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute top-6 right-6 text-green-200">
        <Quote className="h-8 w-8" />
      </div>
      <p className="text-gray-700 mb-6 relative z-10">{quote}</p>
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image} alt={author} />
          <AvatarFallback>
            {author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium text-black">{author}</h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
    </motion.div>
  )
}

