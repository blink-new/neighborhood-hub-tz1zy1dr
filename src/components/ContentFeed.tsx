import { Clock, ExternalLink, MapPin, Star, DollarSign, Users, Heart, Tag, Calendar, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CategoryType, NewsItem, BusinessListing, JobListing, RealEstateListing, ForumPost, ClassifiedAd, DatingProfile, Coupon, Obituary } from '@/types'

interface ContentFeedProps {
  category: CategoryType
  location: string
  data: any[]
  loading?: boolean
}

export function ContentFeed({ category, location, data, loading }: ContentFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <MapPin className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {category.replace('-', ' ')} found
          </h3>
          <p className="text-gray-500">
            We couldn't find any {category.replace('-', ' ')} for {location}. 
            Try a different category or check back later.
          </p>
        </CardContent>
      </Card>
    )
  }

  const renderNewsItem = (item: NewsItem) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary">{item.source}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(item.publishedAt).toLocaleDateString()}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
        <Button variant="outline" size="sm" asChild>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )

  const renderBusinessListing = (item: BusinessListing) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline">{item.category}</Badge>
          {item.rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{item.rating}</span>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">{item.address}</p>
        {item.phone && (
          <p className="text-sm text-gray-500 mb-2">{item.phone}</p>
        )}
        {item.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        )}
        {item.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={item.website} target="_blank" rel="noopener noreferrer">
              Visit Website <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )

  const renderJobListing = (item: JobListing) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary">{item.type}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(item.postedAt).toLocaleDateString()}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-primary font-medium mb-2">{item.company}</p>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {item.location}
        </div>
        {item.salary && (
          <div className="flex items-center text-green-600 mb-3">
            <DollarSign className="h-4 w-4 mr-1" />
            {item.salary}
          </div>
        )}
        <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
        <Button size="sm">Apply Now</Button>
      </CardContent>
    </Card>
  )

  const renderRealEstateListing = (item: RealEstateListing) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant={item.type === 'sale' ? 'default' : 'secondary'}>
            For {item.type === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          <div className="text-lg font-bold text-primary">
            ${item.price.toLocaleString()}
            {item.type === 'rent' && '/mo'}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2">{item.address}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <span>{item.bedrooms} bed</span>
          <span>{item.bathrooms} bath</span>
          <span>{item.sqft.toLocaleString()} sqft</span>
        </div>
        {item.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        )}
        <Button size="sm">View Details</Button>
      </CardContent>
    </Card>
  )

  const renderForumPost = (item: ForumPost) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline">{item.category}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            {item.replies} replies
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{item.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {item.author}</span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )

  const renderClassifiedAd = (item: ClassifiedAd) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline">{item.category}</Badge>
          {item.price && (
            <div className="text-lg font-bold text-green-600">
              ${item.price.toLocaleString()}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{item.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Contact: {item.contact}</span>
          <span>{new Date(item.postedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )

  const renderDatingProfile = (item: DatingProfile) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img 
              src={item.photos[0]} 
              alt={item.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            {item.verified && (
              <Shield className="absolute -top-1 -right-1 h-6 w-6 text-blue-500 bg-white rounded-full p-1" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{item.name}, {item.age}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {item.location}
              </div>
            </div>
            <p className="text-gray-600 mb-3 line-clamp-2">{item.bio}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {item.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {item.interests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{item.interests.length - 3} more
                </Badge>
              )}
            </div>
            <Button size="sm" className="w-full">
              <Heart className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderCoupon = (item: Coupon) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline">{item.category}</Badge>
          <div className="text-lg font-bold text-green-600">
            {item.discount}
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <p className="text-primary font-medium mb-2">{item.business}</p>
        <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        {item.code && (
          <div className="bg-gray-100 p-2 rounded mb-3 text-center">
            <span className="text-sm text-gray-600">Code: </span>
            <span className="font-mono font-bold">{item.code}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Valid until {new Date(item.validUntil).toLocaleDateString()}
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">{item.terms}</p>
        <Button size="sm" className="w-full">
          <Tag className="mr-2 h-4 w-4" />
          Claim Coupon
        </Button>
      </CardContent>
    </Card>
  )

  const renderObituary = (item: Obituary) => (
    <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-gray-400">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-xl mb-1">{item.name}</h3>
          <p className="text-gray-600">
            {new Date(item.dateOfBirth).toLocaleDateString()} - {new Date(item.dateOfDeath).toLocaleDateString()}
          </p>
          <p className="text-gray-500">Age {item.age}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed line-clamp-4">{item.biography}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Survived by:</h4>
          <div className="flex flex-wrap gap-1">
            {item.survivedBy.map((person, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {person}
              </Badge>
            ))}
          </div>
        </div>

        {item.services.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Services:</h4>
            {item.services.map((service, index) => (
              <div key={index} className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{service.type}:</span> {new Date(service.date).toLocaleDateString()} at {service.location}
              </div>
            ))}
          </div>
        )}

        {item.memorialFund && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Memorial donations:</span> {item.memorialFund}
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderContent = () => {
    switch (category) {
      case 'news':
      case 'sports':
        return data.map(renderNewsItem)
      case 'business':
        return data.map(renderBusinessListing)
      case 'jobs':
        return data.map(renderJobListing)
      case 'real-estate':
        return data.map(renderRealEstateListing)
      case 'forums':
        return data.map(renderForumPost)
      case 'classifieds':
        return data.map(renderClassifiedAd)
      case 'dating':
        return data.map(renderDatingProfile)
      case 'coupons':
        return data.map(renderCoupon)
      case 'obituaries':
        return data.map(renderObituary)
      default:
        return data.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                {item.title || item.name || 'Item'}
              </h3>
              <p className="text-gray-600">
                {item.description || item.summary || 'No description available'}
              </p>
            </CardContent>
          </Card>
        ))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize">
          {category.replace('-', ' ')} in {location}
        </h2>
        <Badge variant="secondary">{data.length} items</Badge>
      </div>
      <div className="space-y-4">
        {renderContent()}
      </div>
    </div>
  )
}