import { motion } from "framer-motion";

export default function Sparkles() {
  const sparkles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="sparkles-container">
      {sparkles.map((i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{
            opacity: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
