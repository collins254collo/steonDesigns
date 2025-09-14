"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye,
  Share2,
  ChevronDown,
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Shield,
  ArrowUpDown,
  Check,
  Tag,
  Zap,
  Link
} from "lucide-react";
import { useCart } from "@/context/cartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  description: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isNew: boolean;
  isSale: boolean;
  isBestSeller: boolean;
  tags: string[];
  features: string[];
}

export default function EnhancedShopPage() {
  // State management
  const [cartItems, setCartItems] = useState<(Product & { quantity: number; selectedColor?: string; selectedSize?: string })[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);

  const { addToCart: contextAddToCart } = useCart();

  // product catalog
  const products: Product[] = [
    {
      id: 1,
      name: "Scandinavian Modern Sofa",
      price: 1299,
      originalPrice: 1599,
      image: "/home.webp",
      category: "Furniture",
      brand: "Nordic Design",
      rating: 4.8,
      reviewCount: 156,
      description: "Premium Scandinavian-style sofa with sustainable oak frame and organic cotton upholstery. Perfect for modern living spaces.",
      colors: ["Charcoal", "Cream", "Forest Green"],
      sizes: ["2-Seater", "3-Seater", "L-Shape"],
      inStock: true,
      stockCount: 12,
      isNew: false,
      isSale: true,
      isBestSeller: true,
      tags: ["Sustainable", "Handcrafted", "Premium"],
      features: ["Solid Oak Frame", "Organic Cotton", "10-Year Warranty", "Free Assembly"]
    },
    {
      id: 2,
      name: "Executive Leather Chair",
      price: 899,
      image: "/home.webp",
      category: "Furniture",
      brand: "Office Elite",
      rating: 4.6,
      reviewCount: 89,
      description: "Luxury executive chair with genuine Italian leather and ergonomic design for ultimate comfort during long work sessions.",
      colors: ["Brown", "Black", "Burgundy"],
      sizes: ["Standard", "Tall Back"],
      inStock: true,
      stockCount: 8,
      isNew: true,
      isSale: false,
      isBestSeller: false,
      tags: ["Ergonomic", "Italian Leather", "Executive"],
      features: ["Lumbar Support", "Height Adjustable", "360° Swivel", "5-Year Warranty"]
    },
    {
      id: 3,
      name: "Crystal Chandelier Deluxe",
      price: 1899,
      originalPrice: 2299,
      image:  "/home.webp",
      category: "Lighting",
      brand: "Illumina",
      rating: 4.9,
      reviewCount: 203,
      description: "Stunning crystal chandelier with LED technology, creating brilliant light patterns while being energy efficient.",
      colors: ["Crystal Clear", "Champagne Gold", "Chrome"],
      sizes: ["Medium", "Large", "Extra Large"],
      inStock: true,
      stockCount: 5,
      isNew: false,
      isSale: true,
      isBestSeller: true,
      tags: ["LED", "Energy Efficient", "Luxury"],
      features: ["Dimmable LED", "Remote Control", "Easy Installation", "Lifetime Support"]
    },
    {
      id: 4,
      name: "Minimalist Coffee Table",
      price: 649,
      image:  "/home.webp",
      category: "Furniture",
      brand: "Zen Living",
      rating: 4.4,
      reviewCount: 74,
      description: "Clean-lined coffee table crafted from sustainable bamboo with hidden storage compartments.",
      colors: ["Natural", "Dark Walnut", "White Oak"],
      sizes: ["Small", "Medium", "Large"],
      inStock: false,
      stockCount: 0,
      isNew: false,
      isSale: false,
      isBestSeller: false,
      tags: ["Bamboo", "Storage", "Minimalist"],
      features: ["Hidden Storage", "Sustainable Bamboo", "Water Resistant", "Tool-Free Assembly"]
    },
    {
      id: 5,
      name: "Designer Floor Lamp",
      price: 449,
      originalPrice: 599,
      image:  "/home.webp",
      category: "Lighting",
      brand: "Lumina Studio",
      rating: 4.5,
      reviewCount: 92,
      description: "Contemporary floor lamp with adjustable height and smart home integration for modern living.",
      colors: ["Matte Black", "Brushed Gold", "White"],
      sizes: ["Standard"],
      inStock: true,
      stockCount: 15,
      isNew: true,
      isSale: true,
      isBestSeller: false,
      tags: ["Smart Home", "Adjustable", "Contemporary"],
      features: ["Smart Controls", "Adjustable Height", "Energy Efficient", "Voice Control"]
    },
    {
      id: 6,
      name: "Artisan Ceramic Vase Set",
      price: 129,
      image:  "/home.webp",
      category: "Decor",
      brand: "Clay & Co",
      rating: 4.7,
      reviewCount: 167,
      description: "Hand-thrown ceramic vase set by local artisans, perfect for fresh flowers or as standalone decor pieces.",
      colors: ["Terracotta", "Sage Green", "Ocean Blue"],
      sizes: ["Small Set", "Large Set", "Mixed Set"],
      inStock: true,
      stockCount: 25,
      isNew: false,
      isSale: false,
      isBestSeller: true,
      tags: ["Handmade", "Artisan", "Ceramic"],
      features: ["Hand-Thrown", "Food Safe", "Drainage Holes", "Artisan Made"]
    },
    {
      id: 7,
      name: "Smart Storage Ottoman",
      price: 299,
      originalPrice: 399,
      image: "/home.webp",
      category: "Storage",
      brand: "Smart Home",
      rating: 4.3,
      reviewCount: 128,
      description: "Multi-functional ottoman with built-in storage, wireless charging pad, and Bluetooth speakers.",
      colors: ["Charcoal Gray", "Navy Blue", "Cream"],
      sizes: ["Standard", "Large"],
      inStock: true,
      stockCount: 7,
      isNew: true,
      isSale: true,
      isBestSeller: false,
      tags: ["Smart", "Multi-functional", "Wireless Charging"],
      features: ["Wireless Charging", "Bluetooth Speakers", "Hidden Storage", "USB Ports"]
    },
    {
      id: 8,
      name: "Vintage Persian Rug",
      price: 799,
      image:  "/home.webp",
      category: "Decor",
      brand: "Heritage Rugs",
      rating: 4.8,
      reviewCount: 95,
      description: "Authentic vintage-style Persian rug with intricate patterns, machine washable for modern convenience.",
      colors: ["Traditional Red", "Blue Medallion", "Cream Floral"],
      sizes: ["5x7 ft", "8x10 ft", "9x12 ft"],
      inStock: true,
      stockCount: 18,
      isNew: false,
      isSale: false,
      isBestSeller: true,
      tags: ["Vintage Style", "Machine Washable", "Persian"],
      features: ["Machine Washable", "Non-Slip Backing", "Fade Resistant", "Pet Friendly"]
    }
  ];

  // Get unique categories and brands
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const brands = ["All", ...Array.from(new Set(products.map(p => p.brand)))];

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, selectedRating]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "bestseller":
        return sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Cart functions
  const localAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as typeof prev
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 2000]);
    setSelectedRating(0);
    setSearchQuery("");
  };

  // Quick View Modal
  const QuickViewModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full rounded-lg" />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Colors:</h4>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button key={color} className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sizes:</h4>
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <button key={size} className="px-3 py-1 border rounded-full text-sm hover:bg-gray-50">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-indigo-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              
              <button
                onClick={() => {
                  localAddToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shop Our Collection</h1>
                <p className="text-gray-600">Discover premium furniture and decor for your space</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-indigo-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Truck className="h-5 w-5" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="h-5 w-5" />
              <span className="text-sm">Easy Returns</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-2 px-3 rounded transition ${
                          selectedCategory === category
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-medium mb-3">Brands</h4>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`flex items-center gap-2 w-full text-left py-1 px-2 rounded transition ${
                          selectedRating === rating ? 'bg-indigo-100' : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{rating === 0 ? 'All' : `${rating}+ Stars`}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedProducts.map(product => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full object-cover rounded-t-xl ${
                        viewMode === "list" ? "h-48 rounded-l-xl rounded-t-none" : "h-64"
                      }`}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded">
                          Sale
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-500 text-white rounded">
                          Best Seller
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full shadow-md transition ${
                            wishlist.includes(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-600 hover:text-red-500"
                          }`}
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowQuickView(product)}
                          className="p-2 bg-white text-gray-600 hover:text-indigo-600 rounded-full shadow-md transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-white text-gray-600 hover:text-indigo-600 rounded-full shadow-md transition">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="flex gap-1">
                        {product.tags.slice(0, 1).map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Colors Preview */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-gray-600">Colors:</span>
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-300"
                            title={color}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-indigo-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                          Save ${product.originalPrice - product.price}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                      {product.inStock ? (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {product.stockCount > 10 ? (
                            "In Stock"
                          ) : (
                            `Only ${product.stockCount} left`
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Out of Stock
                        </div>
                      )}
                    </div>

                    {/* Add to Cart */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => localAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                          product.inStock
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                      
                      {/* Quick View Button for Mobile */}
                      <button
                        onClick={() => setShowQuickView(product)}
                        className="px-3 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition lg:hidden"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-xl shadow-lg p-4 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">{getTotalItems()} items</span>
            </div>
            <div className="text-lg font-bold">
              ${getTotalPrice().toFixed(2)}
            </div>
            
            <Link href="/cart">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Cart
            </button>
          </Link>
            
          </div>
        </div>
      )}

      {/* Mini Cart Dropdown */}
      <div className="fixed top-4 right-4 z-50">
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Shopping Cart</h3>
              <span className="text-sm text-gray-600">{getTotalItems()} items</span>
            </div>
            
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-2 border-b">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                Checkout
              </button>
              
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal 
          product={showQuickView} 
          onClose={() => setShowQuickView(null)} 
        />
      )}

      {/* Recently Viewed */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => localAddToCart(product)}
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="h-4 w-4 text-indigo-600" />
                  </button>
                </div>
                <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-indigo-600 font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     

    
    </div>
  );
}