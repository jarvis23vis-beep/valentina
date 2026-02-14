import { motion } from "framer-motion";

export default function FloatingCircles() {
  const isBrowser = typeof window !== "undefined";
  const prefersReduced = isBrowser && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = isBrowser && window.innerWidth < 768;

  const count = prefersReduced ? 3 : isMobile ? 4 : 8;
  const circles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="floating-circles">
      {circles.map((i) => (
        <motion.div
          key={i}
          className="circle"
          style={{ width: Math.random() * (isMobile ? 60 : 100) + (isMobile ? 30 : 50), height: Math.random() * (isMobile ? 60 : 100) + (isMobile ? 30 : 50) }}
          initial={{ x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }}
          animate={{ x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }}
          transition={{ duration: prefersReduced ? 6 : Math.random() * (isMobile ? 6 : 10) + (isMobile ? 6 : 10), repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
