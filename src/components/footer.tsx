"use client";
import { JSX } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUp,
  CreditCard,
  ShoppingBag,
  Package,
  Truck,
  HelpCircle,
} from "lucide-react";

export default function Footer(): JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand / About */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Steon<span className="text-amber-500">Interior</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bringing modern interior design and stylish products into every
              home. Shop our curated furniture, décor, and design solutions
              today.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-amber-500">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Trusted by 500+ Homes
              </div>
              <div className="flex items-center text-amber-500">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Award-winning Designs
              </div>
              <div className="flex items-center text-amber-500">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                Secure Online Shopping
              </div>
            </div>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Shop by Category
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-amber-500 transition cursor-pointer">
                Furniture
              </li>
              <li className="hover:text-amber-500 transition cursor-pointer">
                Lighting
              </li>
              <li className="hover:text-amber-500 transition cursor-pointer">
                Wall Art & Décor
              </li>
              <li className="hover:text-amber-500 transition cursor-pointer">
                Rugs & Carpets
              </li>
              <li className="hover:text-amber-500 transition cursor-pointer">
                Accessories
              </li>
              <li className="hover:text-amber-500 transition cursor-pointer">
                Sale
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Customer Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 hover:text-amber-500 cursor-pointer">
                <HelpCircle className="h-4 w-4 text-amber-500" /> FAQ
              </li>
              <li className="flex items-center gap-2 hover:text-amber-500 cursor-pointer">
                <Package className="h-4 w-4 text-amber-500" /> Returns &
                Exchanges
              </li>
              <li className="flex items-center gap-2 hover:text-amber-500 cursor-pointer">
                <Truck className="h-4 w-4 text-amber-500" /> Shipping Info
              </li>
              <li className="flex items-center gap-2 hover:text-amber-500 cursor-pointer">
                <ShoppingBag className="h-4 w-4 text-amber-500" /> Track Your
                Order
              </li>
              <li className="flex items-center gap-2 hover:text-amber-500 cursor-pointer">
                <CreditCard className="h-4 w-4 text-amber-500" /> Payment
                Options
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Get In Touch
            </h3>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5" />
                <p>123 Design Street, Eldoret, Kenya</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-500" />
                <a
                  href="tel:+2547111234567"
                  className="hover:text-amber-500 transition"
                >
                  +254 711 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-500" />
                <a
                  href="mailto:hello@steoninterior.com"
                  className="hover:text-amber-500 transition"
                >
                  hello@steoninterior.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-500">Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <h4 className="text-white font-semibold mb-2">
                Join Our Design Club
              </h4>
              <p className="text-sm text-gray-400">
                Get exclusive discounts, design inspiration & early access to
                sales.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="flex max-w-md ml-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-amber-500 text-white placeholder-gray-400"
                />
                <button className="px-6 py-3 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="md:flex md:items-center md:justify-between">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">We Accept:</span>
              <img src="/payments/mpesa.png" alt="Mpesa" className="h-6" />
              <img src="/payments/paypal.png" alt="PayPal" className="h-6" />
              <img src="/payments/visa.png" alt="Visa" className="h-6" />
              <img src="/payments/mastercard.png" alt="Mastercard" className="h-6" />
            </div>

            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Steon Interior. All rights reserved. |
              <a href="/privacy" className="hover:text-amber-500 ml-1">
                Privacy Policy
              </a>{" "}
              |
              <a href="/terms" className="hover:text-amber-500 ml-1">
                Terms of Service
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition"
            >
              <ArrowUp className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
