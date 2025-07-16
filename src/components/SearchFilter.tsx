import { useState } from 'react'
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CategoryType } from '@/types'

interface SearchFilterProps {
  category: CategoryType
  onSearch: (query: string) => void
  onSort: (sortBy: string, order: 'asc' | 'desc') => void
  onFilter: (filters: Record<string, any>) => void
  totalResults: number
}

export function SearchFilter({ category, onSearch, onSort, onFilter, totalResults }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortBy(field)
    setSortOrder(newOrder)
    onSort(field, newOrder)
  }

  const getSortOptions = () => {
    switch (category) {
      case 'news':
      case 'sports':
        return [
          { value: 'date', label: 'Date' },
          { value: 'title', label: 'Title' },
          { value: 'source', label: 'Source' }
        ]
      case 'business':
        return [
          { value: 'name', label: 'Name' },
          { value: 'rating', label: 'Rating' },
          { value: 'category', label: 'Category' }
        ]
      case 'jobs':
        return [
          { value: 'date', label: 'Date Posted' },
          { value: 'title', label: 'Job Title' },
          { value: 'company', label: 'Company' }
        ]
      case 'real-estate':
        return [
          { value: 'price', label: 'Price' },
          { value: 'bedrooms', label: 'Bedrooms' },
          { value: 'sqft', label: 'Square Feet' }
        ]
      case 'coupons':
        return [
          { value: 'validUntil', label: 'Expiry Date' },
          { value: 'business', label: 'Business' },
          { value: 'discount', label: 'Discount' }
        ]
      default:
        return [
          { value: 'date', label: 'Date' },
          { value: 'title', label: 'Title' }
        ]
    }
  }

  const getFilterOptions = () => {
    switch (category) {
      case 'business':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => onFilter({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => onFilter({ rating: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
                <SelectItem value="2+">2+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case 'jobs':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => onFilter({ type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case 'real-estate':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select onValueChange={(value) => onFilter({ type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => onFilter({ bedrooms: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => onFilter({ priceRange: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Price</SelectItem>
                <SelectItem value="0-200000">Under $200k</SelectItem>
                <SelectItem value="200000-400000">$200k - $400k</SelectItem>
                <SelectItem value="400000-600000">$400k - $600k</SelectItem>
                <SelectItem value="600000+">$600k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg border p-4 mb-6 space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${category.replace('-', ' ')}...`}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getSortOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort(sortBy)}
            className="px-2"
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      {showFilters && getFilterOptions() && (
        <div className="border-t pt-4">
          {getFilterOptions()}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{totalResults} results found</span>
        {searchQuery && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Search: "{searchQuery}"
            <button
              onClick={() => handleSearch('')}
              className="ml-1 hover:text-gray-800"
            >
              ×
            </button>
          </Badge>
        )}
      </div>
    </div>
  )
}