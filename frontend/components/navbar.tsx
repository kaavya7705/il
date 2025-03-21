"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#features" },
  { name: "About", href: "/#about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/contact" },
]

const serviceItems = [
  { name: "Web Development", href: "/#features" },
  { name: "UI/UX Design", href: "/#features" },
  { name: "Digital Marketing", href: "/#features" },
  { name: "E-Commerce", href: "/#features" },
  { name: "Mobile Apps", href: "/#features" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Floating particles for the navbar
  const FloatingParticle = ({ delay = 0, x = 0, y = 0 }) => (
    <motion.div
      className="absolute rounded-full bg-green-200 opacity-70"
      style={{
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        y: [0, -20],
        x: [0, Math.random() * 20 - 10],
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
    />
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-md py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="text-2xl font-bold text-green-600">Seedling</span>

              {/* Floating particles around logo */}
              <div className="absolute -inset-4 overflow-hidden pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <FloatingParticle key={i} delay={i * 0.5} x={Math.random() * 100} y={Math.random() * 100} />
                ))}
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              if (item.name === "Services") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="px-4 py-2 rounded-md flex items-center text-gray-800 hover:text-green-600"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48 rounded-md p-2">
                      {serviceItems.map((service) => (
                        <DropdownMenuItem key={service.name} asChild>
                          <Link
                            href={service.href}
                            className="w-full px-2 py-1.5 text-sm hover:bg-green-50 hover:text-green-600 rounded-md"
                          >
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-md inline-block transition-colors ${
                      pathname === item.href ? "text-green-600 font-medium" : "text-gray-800 hover:text-green-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-800" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-green-600 text-white flex flex-col"
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-bold text-white">DigitalStudio</span>
              </Link>
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-4">
              <nav className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-medium block py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>

                    {item.name === "Services" && (
                      <div className="pl-4 mt-2 space-y-2">
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="text-lg text-white/80 block py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="container mx-auto px-4 py-8">
              <Button asChild size="lg" className="w-full bg-white text-green-600 hover:bg-white/90">
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

