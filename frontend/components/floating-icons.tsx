"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Code,
  PaintBucket,
  BarChart,
  ShoppingCart,
  Smartphone,
  Rocket,
  Zap,
  Globe,
  Layers,
  MessageCircle,
} from "lucide-react"

type FloatingIcon = {
  icon: React.ReactNode
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Generate random icons
    const iconComponents = [
      <Code key="code" />,
      <PaintBucket key="paint" />,
      <BarChart key="chart" />,
      <ShoppingCart key="cart" />,
      <Smartphone key="phone" />,
      <Rocket key="rocket" />,
      <Zap key="zap" />,
      <Globe key="globe" />,
      <Layers key="layers" />,
      <MessageCircle key="message" />,
    ]

    const newIcons: FloatingIcon[] = []

    for (let i = 0; i < 20; i++) {
      newIcons.push({
        icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 24 + 16,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })
    }

    setIcons(newIcons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-white/20"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: icon.size,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 360, 0],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  )
}

