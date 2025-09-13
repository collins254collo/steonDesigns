"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Home as HomeIcon, Palette, CheckCircle, Star, Phone, Mail, MapPin } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: <HomeIcon className="h-8 w-8" />,
      title: "Residential Design",
      description: "Transform your home into a personalized sanctuary that reflects your unique style and lifestyle needs.",
      features: ["Space Planning", "Color Consultation", "Furniture Selection"]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Commercial Spaces",
      description: "Create inspiring work environments that boost productivity and leave lasting impressions on clients.",
      features: ["Office Design", "Retail Spaces", "Restaurant Interiors"]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Luxury Interiors",
      description: "Exclusive high-end design solutions with premium materials and bespoke furniture selections.",
      features: ["Custom Furniture", "Premium Materials", "Exclusive Designs"]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Design Awards" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "They transformed our outdated living space into a modern masterpiece. Every detail was perfectly executed with incredible attention to quality.",
      rating: 5,
      image: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Business Owner", 
      content: "Our office redesign has significantly improved team morale and client impressions. The ROI has been outstanding!",
      rating: 5,
      image: "MC"
    },
    {
      name: "Emma Rodriguez", 
      role: "Restaurant Owner",
      content: "The restaurant design exceeded our expectations. Customer compliments on the ambiance have increased significantly.",
      rating: 5,
      image: "ER"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/home.webp')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Transform Your Space with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Timeless Elegance
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Award-winning interior design that reflects your personality and brings your vision to life through innovative solutions and exceptional craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 shadow-xl"
            >
              View Our Portfolio
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm"
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="text-4xl sm:text-5xl font-bold text-amber-600 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Design Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we offer comprehensive interior design solutions tailored to your unique needs and vision.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-amber-600 mb-4 transition-transform duration-300"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2 transition-all"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Design Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A systematic approach that ensures your project is completed on time, within budget, and beyond expectations.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { step: "01", title: "Consultation", desc: "Understanding your vision, needs, and budget requirements" },
              { step: "02", title: "Design", desc: "Creating detailed plans, 3D visualizations, and material selections" },
              { step: "03", title: "Implementation", desc: "Managing contractors, timeline, and quality throughout construction" },
              { step: "04", title: "Completion", desc: "Final styling, walkthrough, and project handover with warranty" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-amber-500 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
                  >
                    {testimonial.image}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Let's discuss your vision and bring your dream interior to life. Schedule your free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-amber-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Started Today
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300"
              >
                View Gallery
              </motion.button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-amber-100">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>hello@designstudio.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>New York, NY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}