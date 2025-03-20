"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, ArrowRight, ArrowLeft, User, Mail, Lock, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
  },
  {
    id: 2,
    title: "Business Details",
    description: "Tell us about your business",
  },
  {
    id: 3,
    title: "Account Setup",
    description: "Create your account",
  },
]

export default function SignupPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [activeTab, setActiveTab] = useState("signup")

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">Join Our Platform</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Create an account to access all our features and start growing your business today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Steps */}
            <div className="hidden lg:block">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {steps.map((step) => (
                      <div key={step.id} className="flex items-start gap-4">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            step.id === activeStep
                              ? "bg-green-600 text-white"
                              : step.id < activeStep
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.id < activeStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{step.id}</span>}
                        </div>
                        <div className="space-y-1">
                          <h3 className={`font-medium ${step.id === activeStep ? "text-green-600" : "text-gray-900"}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=400"
                    alt="Join our community"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create your account</CardTitle>
                      <CardDescription>
                        {activeStep === 1
                          ? "Enter your personal information to get started"
                          : activeStep === 2
                            ? "Tell us about your business"
                            : "Set up your account credentials"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Step 1: Personal Information */}
                      {activeStep === 1 && (
                        <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <div className="relative">
                                <Input id="firstName" placeholder="John" />
                                <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <div className="relative">
                                <Input id="lastName" placeholder="Doe" />
                                <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                              <Input id="email" type="email" placeholder="john@example.com" />
                              <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Business Details */}
                      {activeStep === 2 && (
                        <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
                          <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <div className="relative">
                              <Input id="companyName" placeholder="Acme Inc." />
                              <Building className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companySize">Company Size</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                <SelectItem value="501+">501+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website (Optional)</Label>
                            <Input id="website" placeholder="https://example.com" />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Account Setup */}
                      {activeStep === 3 && (
                        <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" placeholder="johndoe" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                              <Input id="password" type="password" />
                              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                              <Input id="confirmPassword" type="password" />
                              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-4">
                            <input
                              type="checkbox"
                              id="terms"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <Label htmlFor="terms" className="text-sm text-gray-700">
                              I agree to the{" "}
                              <Link href="/terms" className="text-green-600 hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-green-600 hover:underline">
                                Privacy Policy
                              </Link>
                            </Label>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {activeStep > 1 ? (
                        <Button variant="outline" onClick={prevStep}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      {activeStep < steps.length ? (
                        <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
                          Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button className="bg-green-600 hover:bg-green-700">Create Account</Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome back</CardTitle>
                      <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Input id="login-email" type="email" placeholder="john@example.com" />
                          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input id="login-password" type="password" />
                          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-green-600 hover:bg-green-700">Sign In</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Mobile Steps Indicator */}
          <div className="flex justify-center mt-8 lg:hidden">
            <div className="flex space-x-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`h-2 w-2 rounded-full ${
                    step.id === activeStep ? "bg-green-600" : step.id < activeStep ? "bg-green-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

