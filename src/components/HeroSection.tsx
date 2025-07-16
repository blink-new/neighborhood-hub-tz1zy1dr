import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface HeroSectionProps {
  onLocationSubmit: (zipCode: string) => void
}

export function HeroSection({ onLocationSubmit }: HeroSectionProps) {
  const [zipCode, setZipCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zipCode.trim()) {
      onLocationSubmit(zipCode.trim())
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-20 px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Your <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Neighborhood</span> Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover everything happening in your community. Local news, businesses, 
            events, and connections all in one place.
          </p>
        </div>

        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm animate-slide-up">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-primary transition-colors"
                  maxLength={5}
                  pattern="[0-9]{5}"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 transform hover:scale-[1.02]"
                disabled={!zipCode.trim()}
              >
                <Search className="mr-2 h-5 w-5" />
                Explore My Neighborhood
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-gray-500 animate-fade-in">
          <p>Join thousands of neighbors staying connected to their community</p>
          <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
            <span>✓ Local News</span>
            <span>✓ Business Directory</span>
            <span>✓ Community Events</span>
            <span>✓ Real Estate</span>
          </div>
        </div>
      </div>
    </div>
  )
}