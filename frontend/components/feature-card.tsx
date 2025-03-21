"use client"

import { motion } from "framer-motion"
import { Code, PaintBucket, BarChart, ShoppingCart, Smartphone, Rocket, type LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type FeatureCardProps = {
  icon: string
  title: string
  description: string
  delay: number
}

export default function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const iconMap: Record<string, LucideIcon> = {
    Code,
    PaintBucket,
    BarChart,
    ShoppingCart,
    Smartphone,
    Rocket,
  }

  const IconComponent = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-2">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
            {IconComponent && <IconComponent className="h-6 w-6" />}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

