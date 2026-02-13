import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FallingHearts() {
  const [hearts, setHearts] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: i % 3 === 0 ? "🌹" : "❤️",
      delay: (i * 0.2) % 3,
      duration: Math.random() * 3 + 4,
      x: Math.random() * window.innerWidth,
    }))
  );

  // Keep adding new hearts continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          emoji: Math.random() > 0.66 ? "🌹" : "❤️",
          delay: 0,
          duration: Math.random() * 3 + 4,
          x: Math.random() * window.innerWidth,
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (id) => {
    // Remove clicked heart with animation
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  };

  return (
    <div className="falling-hearts-container">
      {hearts.map((element) => (
        <motion.div
          key={element.id}
          className="falling-heart"
          initial={{
            opacity: 0,
            y: -50,
            x: element.x,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: window.innerHeight + 50,
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            ease: "linear",
          }}
          onClick={() => handleHeartClick(element.id)}
          whileHover={{ scale: 1.4 }}
          style={{
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
}


