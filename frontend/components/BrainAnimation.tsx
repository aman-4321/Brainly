import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function BrainAnimation() {
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
