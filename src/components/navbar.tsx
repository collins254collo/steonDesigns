"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
              YourLogo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-2 pt-4 pb-6 space-y-3 bg-gray-50 rounded-lg mt-2 shadow-inner">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className={`transform transition-all duration-500 ease-out ${
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 hover:bg-white block px-6 py-4 rounded-md text-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;