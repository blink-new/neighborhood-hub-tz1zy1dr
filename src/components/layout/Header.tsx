import { useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LocationData } from '@/types'

interface HeaderProps {
  currentLocation?: LocationData
  onLocationChange: (zipCode: string) => void
}

export function Header({ currentLocation, onLocationChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [zipInput, setZipInput] = useState('')

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipInput.trim()) {
      onLocationChange(zipInput.trim())
      setZipInput('')
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">
                Neighborhood Hub
              </h1>
            </div>
          </div>

          {/* Location Search - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleLocationSubmit} className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter ZIP code"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                className="w-32"
                maxLength={5}
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
            
            {currentLocation && (
              <div className="text-sm text-gray-600">
                {currentLocation.city}, {currentLocation.state}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Location Search */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleLocationSubmit} className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter ZIP code"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                className="flex-1"
                maxLength={5}
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
            
            {currentLocation && (
              <div className="text-sm text-gray-600 mt-2">
                Current: {currentLocation.city}, {currentLocation.state}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}