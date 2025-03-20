"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  delay: number
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  delay,
  popular = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl border shadow-sm relative overflow-hidden",
        popular
          ? "border-blue-600 dark:border-blue-400 shadow-lg scale-105 z-10"
          : "border-gray-200 dark:border-gray-700",
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500 dark:text-gray-400"> / project</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={cn(
            "w-full",
            popular
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0"
              : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700",
          )}
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  )
}

