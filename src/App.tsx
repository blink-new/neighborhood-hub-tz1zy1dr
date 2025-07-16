import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/HeroSection'
import { CategoryGrid } from '@/components/CategoryGrid'
import { ContentFeed } from '@/components/ContentFeed'
import { SearchFilter } from '@/components/SearchFilter'
import { blink } from '@/blink/client'
import { LocationData, CategoryType, User, DatingProfile, Coupon, Obituary } from '@/types'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'

// Mock data for demonstration
const mockLocationData: Record<string, LocationData> = {
  '10001': { zipCode: '10001', city: 'New York', state: 'NY', county: 'New York County' },
  '90210': { zipCode: '90210', city: 'Beverly Hills', state: 'CA', county: 'Los Angeles County' },
  '60601': { zipCode: '60601', city: 'Chicago', state: 'IL', county: 'Cook County' },
  '33101': { zipCode: '33101', city: 'Miami', state: 'FL', county: 'Miami-Dade County' },
  '78701': { zipCode: '78701', city: 'Austin', state: 'TX', county: 'Travis County' }
}

const generateMockData = (category: CategoryType, location: string) => {
  const baseData = {
    news: [
      {
        id: '1',
        title: `Local ${location} Council Approves New Community Center`,
        summary: 'The city council unanimously voted to approve funding for a new community center that will serve residents with recreational activities and educational programs.',
        url: '#',
        source: `${location} Tribune`,
        publishedAt: new Date().toISOString(),
        category: 'local' as const
      },
      {
        id: '2',
        title: `${location} School District Receives State Recognition`,
        summary: 'The local school district has been recognized by the state for excellence in STEM education and student achievement.',
        url: '#',
        source: `${location} Herald`,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'local' as const
      }
    ],
    sports: [
      {
        id: '1',
        title: `${location} High School Football Team Advances to State Championship`,
        summary: 'The Eagles defeated their rivals 28-14 in a thrilling playoff game that secured their spot in the state championship.',
        url: '#',
        source: `${location} Sports`,
        publishedAt: new Date().toISOString(),
        category: 'sports' as const
      }
    ],
    business: [
      {
        id: '1',
        name: 'Main Street Coffee',
        category: 'Restaurant',
        address: `123 Main St, ${location}`,
        phone: '(555) 123-4567',
        website: 'https://mainstreetcoffee.com',
        rating: 4.5,
        description: 'Cozy local coffee shop serving artisanal coffee and fresh pastries.'
      },
      {
        id: '2',
        name: 'Downtown Pharmacy',
        category: 'Healthcare',
        address: `456 Oak Ave, ${location}`,
        phone: '(555) 987-6543',
        rating: 4.2,
        description: 'Full-service pharmacy with prescription services and health consultations.'
      }
    ],
    jobs: [
      {
        id: '1',
        title: 'Marketing Coordinator',
        company: `${location} Marketing Group`,
        location: location,
        salary: '$45,000 - $55,000',
        description: 'We are seeking a creative marketing coordinator to join our growing team. Responsibilities include social media management, content creation, and campaign coordination.',
        postedAt: new Date().toISOString(),
        type: 'full-time' as const
      }
    ],
    'real-estate': [
      {
        id: '1',
        address: `789 Elm Street, ${location}`,
        price: 350000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: 'sale' as const,
        description: 'Beautiful family home with updated kitchen and spacious backyard.'
      }
    ],
    forums: [
      {
        id: '1',
        title: `Best restaurants in ${location}?`,
        content: 'Looking for recommendations for good restaurants in the area. Any suggestions for family-friendly places?',
        author: 'LocalFoodie',
        createdAt: new Date().toISOString(),
        replies: 12,
        category: 'Food & Dining'
      }
    ],
    classifieds: [
      {
        id: '1',
        title: 'Gently Used Bicycle for Sale',
        description: 'Mountain bike in excellent condition. Perfect for weekend rides and commuting.',
        price: 250,
        category: 'Sports & Recreation',
        contact: 'john@email.com',
        postedAt: new Date().toISOString()
      }
    ],
    dating: [
      {
        id: '1',
        name: 'Sarah M.',
        age: 28,
        bio: 'Love hiking, coffee shops, and exploring local farmers markets. Looking for someone who enjoys outdoor adventures and good conversation.',
        interests: ['Hiking', 'Photography', 'Cooking', 'Travel'],
        location: `${location}`,
        photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
        verified: true
      },
      {
        id: '2',
        name: 'Mike R.',
        age: 32,
        bio: 'Local teacher and weekend musician. Enjoy live music, craft beer, and supporting local businesses.',
        interests: ['Music', 'Teaching', 'Craft Beer', 'Local Events'],
        location: `${location}`,
        photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
        verified: true
      }
    ],
    coupons: [
      {
        id: '1',
        title: '20% Off Your Next Meal',
        description: 'Valid for dine-in or takeout orders. Cannot be combined with other offers.',
        discount: '20% OFF',
        business: 'Main Street Bistro',
        category: 'Restaurant',
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        code: 'SAVE20',
        terms: 'Valid until end of month. One per customer.'
      },
      {
        id: '2',
        title: 'Free Oil Change',
        description: 'Complimentary oil change with any service over $100.',
        discount: 'FREE',
        business: `${location} Auto Care`,
        category: 'Automotive',
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        terms: 'Must present coupon. Valid for standard oil only.'
      }
    ],
    obituaries: [
      {
        id: '1',
        name: 'Robert Johnson',
        age: 78,
        dateOfBirth: '1945-03-15',
        dateOfDeath: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        biography: 'Robert was a beloved husband, father, and grandfather who dedicated his life to education and community service. He taught at the local high school for 40 years and volunteered at the community center.',
        survivedBy: ['Wife Mary Johnson', 'Son David Johnson', 'Daughter Lisa Smith', '5 grandchildren'],
        services: [
          {
            type: 'Viewing',
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            location: `${location} Funeral Home`
          },
          {
            type: 'Memorial Service',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'First Methodist Church'
          }
        ],
        memorialFund: 'Local Education Foundation'
      }
    ]
  }

  return baseData[category] || []
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const [contentData, setContentData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [contentLoading, setContentLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleLocationChange = async (zipCode: string) => {
    const locationData = mockLocationData[zipCode]
    
    if (locationData) {
      setCurrentLocation(locationData)
      setSelectedCategory(null)
      setContentData([])
      toast({
        title: 'Location Updated',
        description: `Now showing information for ${locationData.city}, ${locationData.state}`
      })
    } else {
      toast({
        title: 'Location Not Found',
        description: 'Please try a different ZIP code. Currently supporting: 10001, 90210, 60601, 33101, 78701',
        variant: 'destructive'
      })
    }
  }

  const handleCategorySelect = async (category: CategoryType) => {
    if (!currentLocation) {
      toast({
        title: 'Select Location First',
        description: 'Please enter a ZIP code to view local content',
        variant: 'destructive'
      })
      return
    }

    setSelectedCategory(category)
    setContentLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const data = generateMockData(category, currentLocation.city)
      setContentData(data)
      setFilteredData(data)
      setContentLoading(false)
    }, 1000)
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredData(contentData)
      return
    }

    const filtered = contentData.filter((item) => {
      const searchText = query.toLowerCase()
      
      // Search in different fields based on item type
      if (item.title) {
        return item.title.toLowerCase().includes(searchText) ||
               (item.description && item.description.toLowerCase().includes(searchText)) ||
               (item.summary && item.summary.toLowerCase().includes(searchText))
      }
      if (item.name) {
        return item.name.toLowerCase().includes(searchText) ||
               (item.bio && item.bio.toLowerCase().includes(searchText)) ||
               (item.description && item.description.toLowerCase().includes(searchText))
      }
      return false
    })
    
    setFilteredData(filtered)
  }

  const handleSort = (sortBy: string, order: 'asc' | 'desc') => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    setFilteredData(sorted)
  }

  const handleFilter = (filters: Record<string, any>) => {
    let filtered = [...contentData]
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter((item) => {
          if (key === 'rating' && value.includes('+')) {
            const minRating = parseFloat(value.replace('+', ''))
            return item.rating >= minRating
          }
          if (key === 'priceRange') {
            const [min, max] = value.split('-').map(Number)
            if (max) {
              return item.price >= min && item.price <= max
            } else {
              return item.price >= min
            }
          }
          if (key === 'bedrooms' && value !== 'all') {
            const minBedrooms = parseInt(value)
            return item.bedrooms >= minBedrooms
          }
          return item[key] === value
        })
      }
    })
    
    setFilteredData(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Neighborhood Hub...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Welcome to Neighborhood Hub</h1>
          <p className="text-gray-600 mb-6">Please sign in to access your local community information.</p>
          <button
            onClick={() => blink.auth.login()}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentLocation={currentLocation || undefined}
        onLocationChange={handleLocationChange}
      />
      
      <main>
        {!currentLocation ? (
          <HeroSection onLocationSubmit={handleLocationChange} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Explore {currentLocation.city}, {currentLocation.state}
              </h2>
              <p className="text-gray-600">
                Discover what's happening in your neighborhood
              </p>
            </div>

            <div className="mb-8">
              <CategoryGrid 
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory || undefined}
              />
            </div>

            {selectedCategory && (
              <>
                <SearchFilter
                  category={selectedCategory}
                  onSearch={handleSearch}
                  onSort={handleSort}
                  onFilter={handleFilter}
                  totalResults={filteredData.length}
                />
                <ContentFeed
                  category={selectedCategory}
                  location={`${currentLocation.city}, ${currentLocation.state}`}
                  data={filteredData}
                  loading={contentLoading}
                />
              </>
            )}
          </div>
        )}
      </main>

      <Footer currentLocation={currentLocation || undefined} />
      <Toaster />
    </div>
  )
}

export default App