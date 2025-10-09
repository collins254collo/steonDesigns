"use client";

import { useState } from "react";
import { 
  ArrowRight,
  Award,
  Users,
  Home as HomeIcon,
  Palette,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Sofa,
  Lamp,
  Ruler,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  ChevronDown,
  Grid,
  List,
  Plus,
  Minus,
  Eye,
  Share2,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  Package,
  Link
} from "lucide-react";


export default function EnhancedInteriorEcommerce() {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  
  

      const products = [
        {
          id: 1,
          name: "Modern Velvet Sofa",
          price: 1299,
          image: "/kitchen.jpg",
          rating: 4.8,
          description: "Luxurious velvet upholstery with comfortable seating"
        },
        {
          id: 2,
          name: "Scandinavian Dining Table",
          price: 899,
          image: "/home.webp",
          rating: 4.9,
          description: "Solid oak wood construction with minimalist design"
        },
        {
          id: 3,
          name: "Contemporary Floor Lamp",
          price: 299,
          image: "/home.webp",
          rating: 4.7,
          description: "Adjustable LED lighting with sleek metal finish"
        },
        {
          id: 4,
          name: "Luxury Armchair",
          price: 799,
          image: "/home.webp",
          rating: 4.6,
          description: "Ergonomic design with premium leather upholstery"
        },
        {
          id: 5,
          name: "Glass Coffee Table",
          price: 549,
          image: "/home.webp",
          rating: 4.5,
          description: "Tempered glass top with chrome metal base"
        },
        {
          id: 6,
          name: "Wooden Bookshelf",
          price: 449,
          image: "/home.webp",
          rating: 4.8,
          description: "Multi-tier storage with natural wood finish"
        }
      ];

  
  const services = [
    {
      icon: <HomeIcon className="h-8 w-8 text-amber-600" />,
      title: "Residential Design",
      description: "Transform your home into a personalized sanctuary that reflects your unique style and lifestyle needs.",
      features: ["Space Planning", "Color Consultation", "Furniture Selection"],
      price: "From $150/hr"
    },
    {
      icon: <Palette className="h-8 w-8 text-amber-600" />,
      title: "Commercial Spaces", 
      description: "Create inspiring work environments that boost productivity and leave lasting impressions on clients.",
      features: ["Office Design", "Retail Spaces", "Restaurant Interiors"],
      price: "From $200/hr"
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Luxury Interiors",
      description: "Exclusive high-end design solutions with premium materials and bespoke furniture selections.",
      features: ["Custom Furniture", "Premium Materials", "Exclusive Designs"],
      price: "From $300/hr"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Products Available" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Design Awards" }
  ];

  const testimonials = [
    {
      name: "Simon Miller",
      role: "Homeowner",
      content: "The quality exceeded my expectations. Fast delivery and excellent customer service made the experience seamless.",
      rating: 5,
      verified: true
    },
    {
      name: "Colleen Smith", 
      role: "Business Owner",
      content: "Professional design consultation helped us create the perfect office space. Our productivity has increased significantly.",
      rating: 5,
      verified: true
    },
    {
      name: "Emmanuel Sanders",
      role: "Interior Designer",
      content: "As a professional, I appreciate the quality and variety. My clients love the pieces I source from here.",
      rating: 5,
      verified: true
    }
  ];


  type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number | null;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    badge: string | null;
    colors: string[];
    inStock: boolean;
    description: string;
  };



  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-700 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/api/placeholder/1200/600')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Curated Design.<br />
            <span className="text-amber-400">Delivered.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Shop premium furniture and décor from award-winning designers, or book a consultation to transform your space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/shop"
                className="px-8 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Collection
              </a>
              <a href="/contact" >
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-gray-900 transition cursor-pointer">
                Book Consultation
              </button>
              </a>
            </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-amber-600 mb-2" />
              <span className="font-bold text-gray-900">Free Delivery</span>
              <span className="text-sm text-gray-600">Orders over $500</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-amber-600 mb-2" />
              <span className="font-bold text-gray-900">Secure Payment</span>
              <span className="text-sm text-gray-600">SSL encrypted</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="h-8 w-8 text-amber-600 mb-2" />
              <span className="font-bold text-gray-900">Easy Returns</span>
              <span className="text-sm text-gray-600">30-day policy</span>
            </div>
            <div className="flex flex-col items-center">
              <Headphones className="h-8 w-8 text-amber-600 mb-2" />
              <span className="font-bold text-gray-900">Expert Support</span>
              <span className="text-sm text-gray-600">Design consultation</span>
            </div>
          </div>
        </div>
      </section>

        <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
           Where design meets emotion — discover furniture that inspires the way you live.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </div>
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <a href={`/product/${product.id}`} className="inline-flex items-center justify-center text-amber-600 hover:text-amber-700">
                    <ArrowRight className="h-4 w-4 text-amber-600" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-600">
              Ready to explore our complete collection?
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
              <span>Shop All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm text-gray-500">
              Free shipping on orders over $500
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond furniture, we offer professional interior design services to transform your space
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  {service.icon}
                  <span className="text-2xl font-bold text-amber-600">{service.price}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="/contact" >
                  
                <button className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition cursor-pointer">
                  Book Consultation
                </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from verified customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Design Trends
          </h2>
          <p className="text-amber-100 mb-8 text-lg">
            Get exclusive access to new collections, design tips, and special offers
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
          <p className="text-amber-100 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>



      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Menu</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Shop All</a>
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Furniture</a>
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Lighting</a>
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Decor</a>
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Design Services</a>
                <a href="#" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 rounded">Sale</a>
              </div>
              
              <div className="mt-8 pt-8 border-t">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
         
          </div>
        </div>
      )}
    </div>
  );
}