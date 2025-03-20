import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-green-600">DigitalStudio</span>
            </Link>
            <p className="text-gray-700 mb-4">
              Creating exceptional digital experiences that help businesses grow and succeed.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook" className="hover:text-green-600">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter" className="hover:text-green-600">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram" className="hover:text-green-600">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn" className="hover:text-green-600">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  E-Commerce Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-gray-700 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-700 hover:text-green-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-black">Subscribe</h3>
            <p className="text-gray-700 mb-4">Stay updated with our latest news and offers.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-white" />
              <Button size="icon" className="bg-green-600 hover:bg-green-700 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DigitalStudio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

