"use client";

import { Sofa, Search, Heart, ShoppingCart, Menu, User, LogOut, Settings, Package, Users, Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Function to get total items in cart
  const { getTotalItems } = useCart();

  // Mock authentication functions
  const handleSignIn = (email: string, password: string) => {
    // Mock sign in logic
    setCurrentUser({ name: "John Doe", email });
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Mock sign up logic
    setCurrentUser({ name, email });
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
      password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (authMode === 'signin') {
        handleSignIn(formData.email, formData.password);
      } else {
        handleSignUp(formData.name, formData.email, formData.password);
      }
    };

    if (!showAuthModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                {authMode === 'signin' ? (
                  <User className="h-6 w-6 text-amber-600" />
                ) : (
                  <Users className="h-6 w-6 text-amber-600" />
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h2>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {authMode === 'signup' && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition font-medium flex items-center justify-center space-x-2"
              >
                {authMode === 'signin' ? (
                  <>
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
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
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            {/* Social buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <svg className="h-4 w-4 mr-2" fill="#1877f2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center hover:opacity-80 transition">
                    <Sofa className="h-8 w-8 text-amber-600" />
                    <span className="ml-2 text-2xl font-bold text-gray-900">
                      SteonInterior
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
            <div className="flex items-center space-x-4">
              {/* Auth Section */}
              <div className="relative" ref={dropdownRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition"
                    >
                      <User className="h-6 w-6" />
                      <span className="hidden md:block font-medium">
                        {currentUser?.name}
                      </span>
                    </button>
                    
                    {showAuthDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                          <p className="text-sm text-gray-500">{currentUser?.email}</p>
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
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setAuthMode('signin');
                        setShowAuthModal(true);
                      }}
                      className="text-gray-700 hover:text-amber-600 transition font-medium"
                    >
                      Sign In
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button className="text-gray-700 hover:text-amber-600 transition relative">
                <Heart className="h-6 w-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart */}
            <Link
                href="/cart"
                className="text-gray-700 hover:text-amber-600 transition relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium curosor-pointer">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-700 hover:text-amber-600 transition"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal />
    </>
  );
};

export default Navbar;