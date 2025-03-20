"use client"

import { useEffect, useState, ReactElement} from "react"
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
  Search,
  MessageSquare,
  Award,
} from "lucide-react"

interface FloatingIcon {
  id: number
  icon: ReactElement
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
      <PaintBucket key="paintbucket" />,
      <BarChart key="barchart" />,
      <ShoppingCart key="shoppingcart" />,
      <Smartphone key="smartphone" />,
      <Rocket key="rocket" />,
      <Zap key="zap" />,
      <Globe key="globe" />,
      <Layers key="layers" />,
      <Search key="search" />,
      <MessageSquare key="messagesquare" />,
      <Award key="award" />,
    ]

    const newIcons: FloatingIcon[] = []

    for (let i = 0; i < 20; i++) {
      newIcons.push({
        id: i,
        icon: iconComponents[Math.floor(Math.random() * iconComponents.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, // Size between 0.5 and 2
        duration: Math.random() * 20 + 10, // Duration between 10 and 30 seconds
        delay: Math.random() * -20, // Random delay for more natural movement
      })
    }

    setIcons(newIcons)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-white/10"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}rem`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 360, 0],
          }}
          transition={{
            duration: icon.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: icon.delay,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  )
}

