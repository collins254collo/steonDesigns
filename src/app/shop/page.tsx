"use client";

import { useState, useMemo, useEffect } from "react";
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
  Check,
  Tag,
  AlertCircle,
  Loader2,
  User
} from "lucide-react";

interface Product {
  id: string;
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

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  inStock: boolean;
  variant?: {
    color?: string;
    size?: string;
  };
}

interface CartNotification {
  id: string;
  product: Product;
  quantity: number;
  timestamp: number;
}

// Enhanced API Service for backend communication
class CartApiService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  
  // Mock implementation - replace with actual API calls
  static async addToCart(userId: string, item: CartItem): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock success response
      return { 
        success: true, 
        data: { 
          message: 'Item added to cart',
          item: item 
        } 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to add item to cart' 
      };
    }
  }

  static async updateCartItem(userId: string, productId: string, quantity: number): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { 
        success: true, 
        data: { 
          message: 'Item updated',
          productId,
          quantity 
        } 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update cart item' 
      };
    }
  }

  static async removeFromCart(userId: string, productId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { 
        success: true, 
        data: { 
          message: 'Item removed',
          productId 
        } 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to remove item from cart' 
      };
    }
  }

  static async getCart(userId: string): Promise<{ success: boolean; data?: CartItem[]; error?: string }> {
    try {
      // Check if running in browser
      if (typeof window === "undefined") {
        return { success: false, error: "getCart can only be called on the client." };
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Try to get cart from localStorage as mock data
      const localCart = localStorage.getItem(`cart_${userId}`);
      const cartItems = localCart ? JSON.parse(localCart) : [];
      
      return { success: true, data: cartItems };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch cart",
      };
    }
  }

  static async syncCart(userId: string, localCart: CartItem[]): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, data: { synced: true } };
    } catch (error) {
      return { success: false, error: 'Sync failed' };
    }
  }

  private static getAuthToken(): string {
    if (typeof window === "undefined") return '';
    return localStorage.getItem('authToken') || '';
  }
}

export default function EnhancedShopPage() {
  // Core state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartError, setCartError] = useState<string | null>(null);
  const [cartSyncStatus, setCartSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // User state - simplified initialization
  const [userId, setUserId] = useState<string>('user_123');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Shop functionality state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<{[key: string]: {color?: string, size?: string}}>({});
  
  // Cart notification state
  const [cartNotifications, setCartNotifications] = useState<CartNotification[]>([]);
  
  // Loading states for individual items
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  // Initialize user session
  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      
      // Check for existing auth token
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        setUserId(`user_${Math.random().toString(36).substr(2, 9)}`);
      } else {
        // Create guest session
        const guestId = `guest_${Math.random().toString(36).substr(2, 9)}`;
        setUserId(guestId);
        localStorage.setItem('guestId', guestId);
      }
      
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  // Load cart when user is initialized
  useEffect(() => {
    if (userId) {
      loadCartFromBackend();
    }
  }, [userId]);

  const loadCartFromBackend = async () => {
    if (!userId) return;
    
    setCartError(null);
    setCartSyncStatus('syncing');
    
    const result = await CartApiService.getCart(userId);
    
    if (result.success && result.data) {
      setCartItems(result.data);
      setCartSyncStatus('synced');
    } else {
      setCartError(result.error || 'Failed to load cart');
      setCartSyncStatus('error');
    }
  };

  // Save cart to localStorage as backup
  useEffect(() => {
    if (userId && cartItems.length >= 0) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // Auto-dismiss notifications after 4 seconds
  useEffect(() => {
    if (cartNotifications.length === 0) return;

    const timers = cartNotifications.map(notification => 
      setTimeout(() => {
        setCartNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 4000)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [cartNotifications]);

  // Enhanced product catalog
  const products: Product[] = [
    {
      id: "1",
      name: "Scandinavian Modern Sofa",
      price: 1299,
      originalPrice: 1599,
      image: "/kitchen.jpg",
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
      id: "2",
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
      id: "3",
      name: "Crystal Chandelier Deluxe",
      price: 1899,
      originalPrice: 2299,
      image: "/kitchen.jpg",
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
      id: "4",
      name: "Minimalist Coffee Table",
      price: 399,
      image: "/home.webp",
      category: "Furniture",
      brand: "Zen Living",
      rating: 4.5,
      reviewCount: 76,
      description: "Clean-lined coffee table made from sustainable bamboo, perfect for modern minimalist interiors.",
      colors: ["Natural", "Dark Walnut", "White Oak"],
      sizes: ["Small", "Medium", "Large"],
      inStock: true,
      stockCount: 15,
      isNew: true,
      isSale: false,
      isBestSeller: false,
      tags: ["Sustainable", "Minimalist", "Bamboo"],
      features: ["Bamboo Construction", "Water Resistant", "Easy Assembly", "Eco-Friendly"]
    },
    {
      id: "5",
      name: "Industrial Floor Lamp",
      price: 249,
      originalPrice: 299,
      image: "/kitchen.jpg",
      category: "Lighting",
      brand: "Urban Light Co.",
      rating: 4.3,
      reviewCount: 112,
      description: "Industrial-style floor lamp with adjustable height and Edison bulb, adding character to any space.",
      colors: ["Black", "Bronze", "Copper"],
      sizes: ["Standard"],
      inStock: true,
      stockCount: 22,
      isNew: false,
      isSale: true,
      isBestSeller: true,
      tags: ["Industrial", "Adjustable", "Edison"],
      features: ["Height Adjustable", "Edison Bulb Included", "Stable Base", "Vintage Style"]
    },
    {
      id: "6",
      name: "Luxury Velvet Armchair",
      price: 799,
      image: "/home.webp",
      category: "Furniture",
      brand: "Royal Comfort",
      rating: 4.7,
      reviewCount: 94,
      description: "Plush velvet armchair with gold-finished legs, bringing elegance and comfort to your living room.",
      colors: ["Navy Blue", "Emerald Green", "Dusty Pink"],
      sizes: ["Standard"],
      inStock: true,
      stockCount: 7,
      isNew: false,
      isSale: false,
      isBestSeller: true,
      tags: ["Luxury", "Velvet", "Elegant"],
      features: ["Premium Velvet", "Gold Legs", "High-Density Foam", "Handcrafted"]
    }
  ];

  // Get unique categories and brands
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], []);
  const brands = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.brand)))], []);

  // Enhanced filter and sort logic
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

  // Helper functions
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Convert Product to CartItem format
  const productToCartItem = (product: Product, quantity: number = 1): CartItem => {
    const variants = selectedVariants[product.id];
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      quantity,
      inStock: product.inStock,
      variant: variants
    };
  };

  // Enhanced cart functions
  const handleAddToCart = async (product: Product, quantity: number = 1) => {
    const cartItem = productToCartItem(product, quantity);
    
    setLoadingItems(prev => new Set(prev).add(product.id));
    setCartError(null);
    
    // Optimistically update UI
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, cartItem]);
    }

    try {
      const result = await CartApiService.addToCart(userId, cartItem);
      
      if (!result.success) {
        // Revert optimistic update on failure
        if (existingItem) {
          setCartItems(prev => prev.map(item => 
            item.id === product.id 
              ? { ...item, quantity: existingItem.quantity }
              : item
          ));
        } else {
          setCartItems(prev => prev.filter(item => item.id !== product.id));
        }
        
        setCartError(result.error || 'Failed to add item to cart');
        setCartSyncStatus('error');
      } else {
        setCartSyncStatus('synced');
        
        // Create notification
        const notification: CartNotification = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          timestamp: Date.now()
        };
        
        setCartNotifications(prev => [...prev, notification]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartError('Network error. Please try again.');
      setCartSyncStatus('error');
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    const currentItem = cartItems.find(item => item.id === productId);
    if (!currentItem) return;

    setLoadingItems(prev => new Set(prev).add(productId));
    setCartError(null);
    
    // Optimistically update UI
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }

    try {
      let result;
      if (newQuantity <= 0) {
        result = await CartApiService.removeFromCart(userId, productId);
      } else {
        result = await CartApiService.updateCartItem(userId, productId, newQuantity);
      }
      
      if (!result.success) {
        // Revert optimistic update on failure
        setCartItems(prev => prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: currentItem.quantity }
            : item
        ));
        
        setCartError(result.error || 'Failed to update cart item');
        setCartSyncStatus('error');
      } else {
        setCartSyncStatus('synced');
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      setCartError('Network error. Please try again.');
      setCartSyncStatus('error');
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    const currentItem = cartItems.find(item => item.id === productId);
    if (!currentItem) return;

    setLoadingItems(prev => new Set(prev).add(productId));
    setCartError(null);
    
    setCartItems(prev => prev.filter(item => item.id !== productId));

    try {
      const result = await CartApiService.removeFromCart(userId, productId);
      
      if (!result.success) {
        setCartItems(prev => [...prev, currentItem]);
        setCartError(result.error || 'Failed to remove item from cart');
        setCartSyncStatus('error');
      } else {
        setCartSyncStatus('synced');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      setCartError('Network error. Please try again.');
      setCartSyncStatus('error');
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // Wishlist functions
  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
    } else {
      const cartItem = productToCartItem(product);
      setWishlist(prev => [...prev, cartItem]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 2000]);
    setSelectedRating(0);
    setSearchQuery("");
  };

  const dismissNotification = (notificationId: string) => {
    setCartNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const retryCartSync = async () => {
    await loadCartFromBackend();
  };

  // Component definitions
  const CartNotificationPopup = ({ notification, onDismiss }: { 
    notification: CartNotification; 
    onDismiss: () => void;
  }) => (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm w-full">
      <div className="flex items-start gap-3">
        <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
          <Check className="h-4 w-4 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                Added to Cart!
              </h4>
              <p className="text-gray-600 text-sm truncate">
                {notification.product.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">
                  Qty: {notification.quantity}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-indigo-600">
                  ${notification.product.price}
                </span>
              </div>
            </div>
            
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-3 flex items-center gap-3">
            <img 
              src={notification.product.image} 
              alt={notification.product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">
                Cart Total: {getTotalItems()} items
              </div>
              <div className="text-sm font-semibold text-gray-900">
                ${getSubtotal().toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={onDismiss}
          className="flex-1 py-2 px-3 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
        <a href="/cart " >
        <button 
          onClick={() => {
            onDismiss();
            console.log("Navigate to cart");
          }}
          className="flex-1 py-2 px-3 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
        >
          View Cart
        </button>
        </a>
      </div>
    </div>
  );

  const ErrorBanner = () => {
    if (!cartError) return null;
    
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-red-700">{cartError}</p>
          </div>
          <div className="pl-3">
            <div className="flex space-x-2">
              <button
                onClick={retryCartSync}
                className="text-sm text-red-600 hover:text-red-500 font-medium"
              >
                Retry
              </button>
              <button
                onClick={() => setCartError(null)}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SyncStatusIndicator = () => {
    if (cartSyncStatus === 'synced' || cartSyncStatus === 'idle') return null;
    
    return (
      <div className={`fixed top-16 right-4 z-40 px-3 py-2 rounded-lg shadow-md text-sm ${
        cartSyncStatus === 'syncing' 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        <div className="flex items-center gap-2">
          {cartSyncStatus === 'syncing' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>
            {cartSyncStatus === 'syncing' ? 'Syncing cart...' : 'Cart sync failed'}
          </span>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SyncStatusIndicator />

      {/* Cart Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
        {cartNotifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <CartNotificationPopup
              notification={notification}
              onDismiss={() => dismissNotification(notification.id)}
            />
          </div>
        ))}
      </div>

      {/* Error Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <ErrorBanner />
      </div>

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
            
            <div className="flex items-center gap-4">
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

              {/* User Info */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {isAuthenticated ? 'Welcome back!' : 'Guest User'}
                </span>
              </div>
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
              {sortedProducts.map(product => {
                const cartItem = cartItems.find(item => item.id === product.id);
                const quantityInCart = cartItem?.quantity || 0;
                const isItemLoading = loadingItems.has(product.id);

                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow group relative ${
                      viewMode === "list" ? "flex" : ""
                    } ${isItemLoading ? 'opacity-75' : ''}`}
                  >
                    {/* Loading Overlay */}
                    {isItemLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10 rounded-xl">
                        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                      </div>
                    )}

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
                            onClick={() => toggleWishlist(product)}
                            className={`p-2 rounded-full shadow-md transition ${
                              isInWishlist(product.id)
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
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
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

                      {/* Add to Cart or Quantity Controls */}
                      {quantityInCart > 0 ? (
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => handleUpdateQuantity(product.id, quantityInCart - 1)}
                            disabled={isItemLoading}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-semibold">{quantityInCart}</span>
                          <button
                            onClick={() => handleUpdateQuantity(product.id, quantityInCart + 1)}
                            disabled={isItemLoading}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(product.id)}
                            disabled={isItemLoading}
                            className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock || isItemLoading}
                          className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                            product.inStock && !isItemLoading
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {isItemLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ShoppingCart className="h-4 w-4" />
                          )}
                          {!product.inStock ? "Out of Stock" : isItemLoading ? "Adding..." : "Add to Cart"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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
              ${getSubtotal().toFixed(2)}
            </div>
            
            <a href="/cart">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Cart
            </button>
            </a>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{showQuickView.name}</h2>
                <button onClick={() => setShowQuickView(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img src={showQuickView.image} alt={showQuickView.name} className="w-full rounded-lg" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(showQuickView.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-gray-600">({showQuickView.reviewCount} reviews)</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{showQuickView.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-indigo-600">${showQuickView.price}</span>
                    {showQuickView.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${showQuickView.originalPrice}</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      handleAddToCart(showQuickView);
                      setShowQuickView(null);
                    }}
                    disabled={!showQuickView.inStock}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {showQuickView.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}