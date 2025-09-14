"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  { src: "/gallery/livingroom1.jpg", title: "Modern Living Room", category: "Residential" },
  { src: "/gallery/office1.jpg", title: "Elegant Office Space", category: "Commercial" },
  { src: "/gallery/kitchen1.jpg", title: "Luxury Kitchen", category: "Residential" },
  { src: "/gallery/bedroom1.jpg", title: "Minimalist Bedroom", category: "Residential" },
];

export default function Gallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Our <span className="text-amber-500">Gallery</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={project.src}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
