"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion"
import { ChevronDown } from "lucide-react"
import FloatingIcons from "@/components/floating-icons"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import { fadeIn, staggerContainer } from "@/lib/motion"

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-500 to-yellow-400">
        <div className="absolute inset-0 z-0">
          <FloatingIcons />
        </div>

        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1, 0.1)}
          >
            <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                Create Digital Experiences That Matter
              </h1>
            </motion.div>

            <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                We build beautiful, functional websites and applications that help businesses grow and succeed in the
                digital world.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn("up", "tween", 0.4, 1)}
            >
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-white text-green-600 hover:bg-gray-100 border-0"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white/10"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-12 w-12 border border-white/30 text-white"
            onClick={() => {
              const featuresSection = document.getElementById("features")
              featuresSection?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Services</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We offer a wide range of digital services to help your business thrive online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="Code"
              title="Web Development"
              description="We build responsive, fast-loading websites that look great on any device and help you achieve your business goals."
              delay={0.1}
            />
            <FeatureCard
              icon="PaintBucket"
              title="UI/UX Design"
              description="Our design team creates beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement."
              delay={0.2}
            />
            <FeatureCard
              icon="BarChart"
              title="Digital Marketing"
              description="We help you reach your target audience with data-driven marketing strategies that deliver measurable results."
              delay={0.3}
            />
            <FeatureCard
              icon="ShoppingCart"
              title="E-Commerce Solutions"
              description="Build and optimize online stores that drive sales and provide seamless shopping experiences for your customers."
              delay={0.4}
            />
            <FeatureCard
              icon="Smartphone"
              title="Mobile App Development"
              description="Create custom mobile applications that extend your reach and provide value to your users on the go."
              delay={0.5}
            />
            <FeatureCard
              icon="Rocket"
              title="Growth Strategy"
              description="Develop comprehensive digital strategies that align with your business goals and drive sustainable growth."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=1000&width=800"
                  alt="Our team working"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-6">
                We're a team of passionate designers, developers, and digital strategists dedicated to creating
                exceptional digital experiences that help businesses thrive in the digital age.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                With over 10 years of experience in the industry, we've helped hundreds of clients across various
                sectors achieve their digital goals and grow their businesses online.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">250+</h3>
                  <p className="text-gray-700">Projects Completed</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">15+</h3>
                  <p className="text-gray-700">Team Members</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">10+</h3>
                  <p className="text-gray-700">Years Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">99%</h3>
                  <p className="text-gray-700">Client Satisfaction</p>
                </div>
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white border-0">Learn More About Us</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">What Our Clients Say</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Working with this team was a game-changer for our business. They delivered a website that exceeded our expectations and has significantly improved our online presence."
              author="Sarah Johnson"
              position="CEO, TechStart"
              image="/placeholder.svg?height=200&width=200"
              delay={0.1}
            />
            <TestimonialCard
              quote="The attention to detail and level of creativity they brought to our project was impressive. They truly understood our vision and brought it to life beautifully."
              author="Michael Chen"
              position="Marketing Director, GrowthCo"
              image="/placeholder.svg?height=200&width=200"
              delay={0.2}
            />
            <TestimonialCard
              quote="Not only did they deliver an exceptional website, but they also provided valuable insights and recommendations that have helped us improve our overall digital strategy."
              author="Emily Rodriguez"
              position="Founder, Artisan Brands"
              image="/placeholder.svg?height=200&width=200"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-green-600 to-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-xl mb-8 text-white/90">
              Let's work together to create a digital experience that drives results for your business.
            </p>
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Link href="/signup">Get Started Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

