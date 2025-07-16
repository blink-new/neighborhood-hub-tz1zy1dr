import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'
import { LocationData } from '@/types'

interface FooterProps {
  currentLocation?: LocationData
}

export function Footer({ currentLocation }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Neighborhood Hub</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Your comprehensive local community platform. Discover news, businesses, 
              events, and connections in your neighborhood.
            </p>
            {currentLocation && (
              <div className="flex items-center text-gray-300 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                Currently viewing: {currentLocation.city}, {currentLocation.state}
              </div>
            )}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Local News</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Business Directory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Real Estate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Job Listings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Community Forums</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                hello@neighborhoodhub.com
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </li>
            </ul>
            <div className="mt-4">
              <h5 className="font-medium mb-2">Support</h5>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Neighborhood Hub. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Connecting communities, one neighborhood at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}