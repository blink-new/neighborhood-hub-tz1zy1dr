import { 
  Newspaper, 
  Trophy, 
  Building2, 
  Home, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  Tag, 
  Flower, 
  ShoppingBag 
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryType } from '@/types'

interface CategoryGridProps {
  onCategorySelect: (category: CategoryType) => void
  selectedCategory?: CategoryType
}

const categories = [
  {
    id: 'news' as CategoryType,
    name: 'Local News',
    icon: Newspaper,
    description: 'Latest local news and updates',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'sports' as CategoryType,
    name: 'Sports',
    icon: Trophy,
    description: 'Local sports teams and events',
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'business' as CategoryType,
    name: 'Businesses',
    icon: Building2,
    description: 'Local business directory',
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'real-estate' as CategoryType,
    name: 'Real Estate',
    icon: Home,
    description: 'Homes for sale and rent',
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    id: 'dating' as CategoryType,
    name: 'Dating',
    icon: Heart,
    description: 'Local dating and connections',
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
  },
  {
    id: 'jobs' as CategoryType,
    name: 'Jobs',
    icon: Briefcase,
    description: 'Local job opportunities',
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'forums' as CategoryType,
    name: 'Forums',
    icon: MessageSquare,
    description: 'Community discussions',
    color: 'bg-teal-50 hover:bg-teal-100 border-teal-200'
  },
  {
    id: 'coupons' as CategoryType,
    name: 'Coupons',
    icon: Tag,
    description: 'Local deals and discounts',
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  },
  {
    id: 'obituaries' as CategoryType,
    name: 'Obituaries',
    icon: Flower,
    description: 'Memorial notices',
    color: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
  },
  {
    id: 'classifieds' as CategoryType,
    name: 'Classifieds',
    icon: ShoppingBag,
    description: 'Buy, sell, and trade locally',
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  }
]

export function CategoryGrid({ onCategorySelect, selectedCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => {
        const Icon = category.icon
        const isSelected = selectedCategory === category.id
        
        return (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in ${
              isSelected 
                ? 'ring-2 ring-primary shadow-lg scale-105 bg-primary/5' 
                : `${category.color} hover:shadow-md`
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardContent className="p-4 text-center">
              <Icon className={`h-8 w-8 mx-auto mb-2 transition-all duration-200 ${
                isSelected ? 'text-primary scale-110' : 'text-gray-600 group-hover:scale-110'
              }`} />
              <h3 className={`font-medium text-sm mb-1 transition-colors ${
                isSelected ? 'text-primary' : 'text-gray-900'
              }`}>
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 leading-tight">
                {category.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}