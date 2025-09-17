"use client";

import { Sofa, Search, Heart, ShoppingCart, Menu, User, LogOut, Settings, Package, Users, Mail, Lock, Eye, EyeOff, X, Phone, UserPlus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use cart context - get all cart-related data and functions
  const {
    cartItems,
    wishlist,
    getTotalItems,
    getSubtotal,
    isLoading
  } = useCart();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAuthDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock authentication functions - updated to include phone
  const handleSignIn = (email: string, password: string) => {
    // Mock sign in logic
    setCurrentUser({ name: "John Doe", email, phone: "+1234567890" });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleSignUp = (name: string, email: string, password: string, phone: string) => {
    // Mock sign up logic
    setCurrentUser({ name, email, phone });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowAuthDropdown(false);
  };

  const AuthModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (authMode === 'signin') {
        handleSignIn(formData.email, formData.password);
      } else {
        handleSignUp(formData.name, formData.email, formData.password, formData.phone);
      }
    };

    if (!showAuthModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                {authMode === 'signin' ? (
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                ) : (
                  <UserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                )}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {authMode === 'signup' && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition text-sm sm:text-base"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              )}
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition text-sm sm:text-base"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition text-sm sm:text-base"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              )}
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition text-sm sm:text-base"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-amber-700 transition font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {authMode === 'signin' ? (
                  <>
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-4 sm:mt-6 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
            
            {/* Social divider */}
            <div className="mt-4 sm:mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            {/* Social buttons */}
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden sm:inline">Google</span>
                <span className="sm:hidden">G</span>
              </button>
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="#1877f2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="hidden sm:inline">Facebook</span>
                <span className="sm:hidden">F</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Preview Component (enhanced with context data)
  const CartPreview = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen || cartItems.length === 0) return null;

    return (
      <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Shopping Cart</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-500">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </span>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
            {cartItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-amber-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {cartItems.length > 3 && (
              <div className="text-center py-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  +{cartItems.length - 3} more {cartItems.length - 3 === 1 ? 'item' : 'items'}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 mt-3 sm:mt-4 pt-3 sm:pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm sm:text-base font-semibold text-gray-900">Subtotal:</span>
              <span className="text-base sm:text-lg font-bold text-amber-600">
                ${getSubtotal().toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-2">
              <Link href="/cart" onClick={onClose}>
                <button className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition font-medium text-sm">
                  View Cart
                </button>
              </Link>
              <Link href="/checkout" onClick={onClose}>
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition font-medium text-sm">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // State for cart preview
  const [showCartPreview, setShowCartPreview] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center hover:opacity-80 transition">
                    <Sofa className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                    <span className="ml-2 text-lg sm:text-2xl font-bold text-gray-900">
                      <span className="hidden sm:inline">SteonInterior</span>
                      <span className="sm:hidden">Steon</span>
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
                <Link
                  href="/shop"
                  className="text-gray-900 hover:text-amber-600 font-medium transition"
                >
                  Shop All
                </Link>
                <Link
                  href="/furniture"
                  className="text-gray-500 hover:text-amber-600 transition"
                >
                  Furniture
                </Link>
                <Link
                  href="/lighting"
                  className="text-gray-500 hover:text-amber-600 transition"
                >
                  Lighting
                </Link>
                <Link
                  href="/decor"
                  className="text-gray-500 hover:text-amber-600 transition"
                >
                  Decor
                </Link>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-amber-600 transition"
                >
                  Design Services
                </Link>
                <Link
                  href="/sale"
                  className="text-red-600 hover:text-red-700 font-medium transition"
                >
                  Sale
                </Link>
              </nav>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Auth Section */}
              <div className="relative" ref={dropdownRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-amber-600 transition"
                    >
                      <User className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="hidden md:block font-medium text-sm">
                        {currentUser?.name}
                      </span>
                    </button>
                    
                    {showAuthDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                          <p className="text-xs text-gray-500">{currentUser?.email}</p>
                          {currentUser?.phone && (
                            <p className="text-xs text-gray-500">{currentUser?.phone}</p>
                          )}
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Orders
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {/* Mobile: Show only icons */}
                    <div className="flex items-center space-x-1 sm:hidden">
                      <button
                        onClick={() => {
                          setAuthMode('signin');
                          setShowAuthModal(true);
                        }}
                        className="p-2 text-gray-700 hover:text-amber-600 transition"
                        title="Sign In"
                      >
                        <User className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                        }}
                        className="p-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
                        title="Sign Up"
                      >
                        <UserPlus className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Desktop: Show text links */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setAuthMode('signin');
                          setShowAuthModal(true);
                        }}
                        className="text-gray-700 hover:text-amber-600 transition font-medium text-sm"
                      >
                        Sign In
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                        }}
                        className="bg-amber-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-amber-700 transition font-medium text-sm"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="text-gray-700 hover:text-amber-600 transition relative p-1">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart with Enhanced Preview */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setShowCartPreview(!showCartPreview)}
                  className="text-gray-700 hover:text-amber-600 transition relative group p-1"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium animate-pulse group-hover:animate-none text-[10px] sm:text-xs">
                      {getTotalItems()}
                    </span>
                  )}
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="animate-spin rounded-full h-3 w-3 border border-amber-600 border-t-transparent"></div>
                    </div>
                  )}
                </button>

                {/* Cart Preview Dropdown */}
                <CartPreview 
                  isOpen={showCartPreview} 
                  onClose={() => setShowCartPreview(false)} 
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 hover:text-amber-600 transition p-1"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative flex flex-col w-full max-w-xs ml-auto h-full bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 bg-amber-600">
                <div className="flex items-center">
                  <Sofa className="h-8 w-8 text-white" />
                  <span className="ml-2 text-xl font-bold text-white">SteonInterior</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 px-4 py-6 space-y-6">
                <nav className="space-y-4">
                  <Link href="/shop" className="block text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Shop All
                  </Link>
                  <Link href="/furniture" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    Furniture
                  </Link>
                  <Link href="/lighting" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    Lighting
                  </Link>
                  <Link href="/decor" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    Decor
                  </Link>
                  <Link href="/services" className="block text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                    Design Services
                  </Link>
                  <Link href="/sale" className="block text-red-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Sale
                  </Link>
                </nav>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Link href="/wishlist" className="flex items-center text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      <Heart className="h-5 w-5 mr-2" />
                      Wishlist ({wishlist.length})
                    </Link>
                    <Link href="/cart" className="flex items-center text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Cart ({getTotalItems()})
                    </Link>
                  </div>

                  {/* Cart Summary in Mobile Menu */}
                  {cartItems.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="font-medium text-gray-900 mb-2">Cart Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Items:</span>
                          <span>{getTotalItems()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Subtotal:</span>
                          <span>${getSubtotal().toFixed(2)}</span>
                        </div>
                      </div>
                      <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded-lg font-medium">
                          View Cart
                        </button>
                      </Link>
                    </div>
                  )}

                  {/* Authentication section in mobile menu */}
                  {!isAuthenticated && (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setAuthMode('signin');
                          setShowAuthModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition font-medium"
                      >
                        <User className="h-4 w-4" />
                        <span>Sign In</span>
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center space-x-2 border border-amber-600 text-amber-600 py-2 px-4 rounded-lg hover:bg-amber-50 transition font-medium"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </button>
                    </div>
                  )}

                  {isAuthenticated && (
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                        <p className="text-xs text-gray-500">{currentUser?.email}</p>
                        {currentUser?.phone && (
                          <p className="text-xs text-gray-500">{currentUser?.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Orders
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Navbar;