"use client"

import { motion } from "framer-motion"
import { Code, PaintBucket, BarChart, ShoppingCart, Smartphone, Rocket } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  delay: number
}

export default function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return <Code className="h-6 w-6" />
      case "PaintBucket":
        return <PaintBucket className="h-6 w-6" />
      case "BarChart":
        return <BarChart className="h-6 w-6" />
      case "ShoppingCart":
        return <ShoppingCart className="h-6 w-6" />
      case "Smartphone":
        return <Smartphone className="h-6 w-6" />
      case "Rocket":
        return <Rocket className="h-6 w-6" />
      default:
        return <Code className="h-6 w-6" />
    }
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
        {getIcon(icon)}
      </div>
      <h3 className="text-xl font-bold mb-3 text-black group-hover:text-green-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
}

