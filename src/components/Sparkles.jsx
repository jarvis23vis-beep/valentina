import { motion } from "framer-motion";

export default function Sparkles() {
  const isBrowser = typeof window !== "undefined";
  const prefersReduced = isBrowser && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = isBrowser && window.innerWidth < 768;

  const count = prefersReduced ? 4 : isMobile ? 6 : 15;
  const sparkles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="sparkles-container">
      {sparkles.map((i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{ opacity: 0, x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }}
          animate={{ opacity: [0, 1, 0], x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }}
          transition={{ duration: prefersReduced ? 2 : Math.random() * 2 + 2, repeat: Infinity, delay: Math.random() * 0.5 }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
