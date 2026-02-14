import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FallingHearts() {
  const isBrowser = typeof window !== "undefined";
  const prefersReduced = isBrowser && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = isBrowser && window.innerWidth < 768;

  const initialCount = prefersReduced ? 6 : isMobile ? 20 : 50;
  const spawnInterval = isMobile ? 600 : 300;

  const [hearts, setHearts] = useState(
    Array.from({ length: initialCount }, (_, i) => ({
      id: i,
      emoji: i % 3 === 0 ? "🌹" : "❤️",
      delay: (i * 0.25) % 3,
      duration: prefersReduced ? 2 : Math.random() * 3 + 4,
      x: isBrowser ? Math.random() * window.innerWidth : 0,
    }))
  );

  useEffect(() => {
    if (prefersReduced) return undefined;

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-200),
        {
          id: Date.now() + Math.random(),
          emoji: Math.random() > 0.66 ? "🌹" : "❤️",
          delay: 0,
          duration: isMobile ? Math.random() * 2 + 3 : Math.random() * 3 + 4,
          x: isBrowser ? Math.random() * window.innerWidth : 0,
        },
      ]);
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [prefersReduced, isMobile]);

  const handleHeartClick = (id) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  };

  return (
    <div className="falling-hearts-container">
      {hearts.map((element) => (
        <motion.div
          key={element.id}
          className="falling-heart"
          initial={{ opacity: 0, y: -30, x: element.x }}
          animate={{ opacity: [0, 1, 0], y: (isBrowser ? window.innerHeight : 800) + 50, rotate: [0, Math.random() * 360] }}
          transition={{ duration: element.duration, delay: element.delay, ease: "linear" }}
          onClick={() => handleHeartClick(element.id)}
          whileHover={prefersReduced ? {} : { scale: 1.25 }}
          style={{ cursor: "pointer", userSelect: "none", willChange: "transform, opacity" }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
}


