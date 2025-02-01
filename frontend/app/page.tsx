"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-900">
      <motion.div
        className="md:w-1/2 flex flex-col justify-center p-8 md:p-16"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <Brain className="h-10 w-10 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold">Brainily</h1>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Your Second Brain,
          <br />
          <span className="text-purple-600">Reimagined</span>
        </h2>
        <p className="text-xl mb-8 text-gray-600">
          Organize thoughts, boost productivity, and unlock your mind&apos;s
          full potential with Brainily.
        </p>
        <div className="flex space-x-4">
          <Button
            asChild
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            <Link href="/dashboard" className="flex items-center">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href="#" className="text-purple-600 hover:text-purple-700">
              Learn More
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="md:w-1/2 bg-purple-100 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BrainAnimation />
      </motion.div>
    </div>
  );
}

function BrainAnimation() {
  return (
    <motion.div
      className="relative w-64 h-64"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <Brain className="w-full h-full text-purple-600" />
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-300 mix-blend-multiply"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </motion.div>
  );
}
