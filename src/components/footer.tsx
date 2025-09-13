import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Interior<span className="text-amber-600">Design</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Crafting elegant and functional spaces for modern living.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-amber-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-amber-600 transition">About</a></li>
            <li><a href="/services" className="hover:text-amber-600 transition">Services</a></li>
            <li><a href="/projects" className="hover:text-amber-600 transition">Projects</a></li>
            <li><a href="/contact" className="hover:text-amber-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-amber-600 transition">Facebook</a>
            <a href="#" className="hover:text-amber-600 transition">Instagram</a>
            <a href="#" className="hover:text-amber-600 transition">Pinterest</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Interior Design Studio. All rights reserved.
      </div>
    </footer>
  );
}
