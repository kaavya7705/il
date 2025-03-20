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
import { useRouter } from 'next/navigation'
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

interface SignupFormProps {
  type: 'user' | 'mentor';
}

function SignupForm({ type }: SignupFormProps) {
  // Add this near the other state declarations at the top of SignupForm component
  const [activeTab, setActiveTab] = useState('user')
  const [activeStep, setActiveStep] = useState(1)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [website, setWebsite] = useState('')
  const [expertise, setExpertise] = useState('')
  const [experience, setExperience] = useState('')
  const [bio, setBio] = useState('')
  const [availableHours, setAvailableHours] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

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

  const handleSubmit = async () => {
    try {
      const endpoint = type === 'mentor' 
        ? '/api/auth/mentor/signup'
        : '/api/auth/signup';
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          firstName,
          lastName,
          age: parseInt(age),
          gender,
          phone,
          company: {
            name: companyName,
            industry,
            size: companySize,
            website,
          },
          description,
          number_of_pupils: 0,
          expertise,
          experience: parseInt(experience),
          bio,
          availableHours: type === 'mentor' ? parseInt(availableHours) : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  }

  return (
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
                  <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="Enter your age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Professional Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Tell us about your professional background and skills..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Business Details */}
        {activeStep === 2 && (
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <div className="relative">
                <Input id="companyName" placeholder="Acme Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <Building className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
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
              <Select value={companySize} onValueChange={setCompanySize}>
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
              <Input id="website" placeholder="https://example.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {type === 'mentor' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <Select value={expertise} onValueChange={setExpertise}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Development</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input 
                    id="experience" 
                    type="number" 
                    placeholder="Years of experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Tell us about your professional background..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableHours">Available Hours per Week</Label>
                  <Input 
                    id="availableHours" 
                    type="number" 
                    placeholder="Hours available per week"
                    value={availableHours}
                    onChange={(e) => setAvailableHours(e.target.value)}
                  />
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Step 3: Account Setup */}
        {activeStep === 3 && (
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
        {activeStep > 1 && (
          <Button onClick={prevStep} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        )}
        {activeStep < steps.length ? (
          <Button onClick={nextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Create Account <CheckCircle2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Update the SignupPage component
export default function SignupPage() {
  const [activeTab, setActiveTab] = useState('user')
  const [activeStep, setActiveStep] = useState(1)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          Join Our Platform
        </h1>
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
                      {step.id < activeStep ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 
                        className={`font-medium ${
                          step.id === activeStep ? "text-green-600" : "text-gray-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="mentor">Sign Up as Mentor</TabsTrigger>
              <TabsTrigger value="user">Sign Up as User</TabsTrigger>
            </TabsList>

            <TabsContent value="mentor">
              <SignupForm type="mentor" />
            </TabsContent>

            <TabsContent value="user">
              <SignupForm type="user" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

