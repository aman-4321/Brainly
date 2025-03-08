"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Search, Zap, Database } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 border-b border-gray-200 backdrop-blur-md bg-white/80 py-4 px-6 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Brainly
            </span>
          </Link>

          <div className="hidden md:flex space-x-8 text-gray-600">
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Product
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Resources
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Download
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              FAQ
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/signin"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 shadow-lg shadow-blue-600/20">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-blue-700 font-medium text-sm mb-8">
            🚀 Welcome to your digital memory companion
          </div>
          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 text-transparent bg-clip-text leading-tight">
            Unlock Infinite Memory with Your Second Brain
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl">
            One platform to organize, search, and utilize information scattered
            across apps, bookmarks, links, notes, and files — all in one place.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-xl shadow-blue-600/20">
                <span className="text-lg">Get your second brain</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link
              href="#demo"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>Watch demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-xl"
          >
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-600">
              Find anything instantly with our powerful semantic search engine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-xl"
          >
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Let AI organize and connect your information automatically.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-xl"
          >
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Universal Storage</h3>
            <p className="text-gray-600">
              Store and access all your digital knowledge in one place.
            </p>
          </motion.div>
        </div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 relative max-w-6xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent z-10" />
          <Image
            className="rounded-2xl shadow-2xl border border-gray-200"
            alt="Brainly App Preview"
            width={1300}
            height={800}
            src="https://www.usefindr.com/_next/image?url=%2Fstatic%2Fimages%2Ffeatures%2Fmemory-wall.webp&w=1920&q=75"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
