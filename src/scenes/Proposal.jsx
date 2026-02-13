import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import FloatingCircles from "../components/FloatingCircles";
import Sparkles from "../components/Sparkles";

export default function Proposal({ onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track mouse position for desktop runaway effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Make No button run away on desktop
  useEffect(() => {
    if (!noButtonRef.current || isMobile) return;

    const button = noButtonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const buttonCenter = {
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2,
    };

    // Distance between mouse and button center
    const distance = Math.sqrt(
      Math.pow(mousePos.x - buttonCenter.x, 2) +
      Math.pow(mousePos.y - buttonCenter.y, 2)
    );

    // If mouse is within 100px, make button flee
    if (distance < 100) {
      const angle = Math.atan2(buttonCenter.y - mousePos.y, buttonCenter.x - mousePos.x);
      const newX = Math.cos(angle) * 150;
      const newY = Math.sin(angle) * 150;

      setNoPosition({ x: newX, y: newY });
    }
  }, [mousePos, isMobile]);

  // Handle No button click on mobile - jump to random position
  const handleNoClick = (e) => {
    e.preventDefault();
    if (isMobile) {
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300 + 100;
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="scene proposal-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <Sparkles />

      <motion.div
        className="proposal-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hearts decoration */}
        <motion.div
          className="proposal-hearts"
          variants={itemVariants}
        >
          ❤️ 💕 ❤️
        </motion.div>

        {/* Main question */}
        <motion.h1
          className="proposal-text"
          variants={itemVariants}
        >
          Will you be my Valentine?
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="proposal-subtext"
          variants={itemVariants}
        >
          💕 Say yes to endless love and beautiful moments together 💕
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="proposal-buttons"
          variants={itemVariants}
        >
          <motion.button
            className="yes-button"
            onClick={onYes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes! ❤️
          </motion.button>

          <motion.button
            ref={noButtonRef}
            className="no-button"
            onClick={handleNoClick}
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                const rect = e.currentTarget.getBoundingClientRect();
                const randomX = (Math.random() - 0.5) * 300;
                const randomY = (Math.random() - 0.5) * 300;
                setNoPosition({ x: randomX, y: randomY });
              }
            }}
          >
            No 😢
          </motion.button>
        </motion.div>

        {/* Fun message */}
        <motion.p
          className="proposal-hint"
          variants={itemVariants}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isMobile ? "Try clicking No... 😉" : "Try hovering over No... 😉"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
