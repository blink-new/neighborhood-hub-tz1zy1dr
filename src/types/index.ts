export interface User {
  id: string
  email: string
  displayName?: string
}

export interface LocationData {
  zipCode: string
  city: string
  state: string
  county?: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  url: string
  source: string
  publishedAt: string
  category: 'local' | 'sports' | 'business'
}

export interface BusinessListing {
  id: string
  name: string
  category: string
  address: string
  phone?: string
  website?: string
  rating?: number
  description?: string
}

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  description: string
  postedAt: string
  type: 'full-time' | 'part-time' | 'contract'
}

export interface RealEstateListing {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: 'sale' | 'rent'
  description?: string
  imageUrl?: string
}

export interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  replies: number
  category: string
}

export interface ClassifiedAd {
  id: string
  title: string
  description: string
  price?: number
  category: string
  contact: string
  postedAt: string
  imageUrl?: string
}

export interface DatingProfile {
  id: string
  name: string
  age: number
  bio: string
  interests: string[]
  location: string
  photos: string[]
  verified: boolean
}

export interface Coupon {
  id: string
  title: string
  description: string
  discount: string
  business: string
  category: string
  validUntil: string
  code?: string
  terms: string
}

export interface Obituary {
  id: string
  name: string
  age: number
  dateOfBirth: string
  dateOfDeath: string
  biography: string
  survivedBy: string[]
  services: {
    type: string
    date: string
    location: string
  }[]
  memorialFund?: string
}

export type CategoryType = 
  | 'news' 
  | 'sports' 
  | 'business' 
  | 'real-estate' 
  | 'dating' 
  | 'jobs' 
  | 'forums' 
  | 'coupons' 
  | 'obituaries' 
  | 'classifieds'