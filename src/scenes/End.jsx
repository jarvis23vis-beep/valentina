import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingCircles from "../components/FloatingCircles";
import FallingHearts from "../components/FallingHearts";
import Sparkles from "../components/Sparkles";

export default function End({ onReset }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="scene end-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <FallingHearts />
      <Sparkles />

      <motion.div
        className="end-container"
        variants={containerVariants}
        initial="hidden"
        animate={showText ? "visible" : "hidden"}
      >
        <motion.div
          className="love-text-wrapper"
          variants={textVariants}
        >
          <h1 className="love-text">I Love You<br /><span className="drashti-name">Drashti</span></h1>
        </motion.div>

        <motion.div
          className="hearts-decoration"
          variants={childVariants}
        >
          <span className="deco-heart">❤️</span>
          <span className="deco-rose">🌹</span>
          <span className="deco-heart">❤️</span>
        </motion.div>

        <motion.p
          className="end-message"
          variants={childVariants}
        >
          You are my eternal love, my heartbeat, my soul
        </motion.p>

        <motion.div
          className="end-buttons"
          variants={childVariants}
        >
          <motion.button
            className="restart-button"
            onClick={onReset}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(231, 76, 60, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start Over
          </motion.button>
        </motion.div>

        <motion.div
          className="floating-elements"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="element">✨</div>
          <div className="element">💕</div>
          <div className="element">✨</div>
          <div className="element">💕</div>
          <div className="element">✨</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

