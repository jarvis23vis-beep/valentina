import { motion } from "framer-motion";
import Sparkles from "../components/Sparkles";
import FloatingCircles from "../components/FloatingCircles";
import FallingHearts from "../components/FallingHearts";

export default function Intro({ onNext }) {
  return (
    <motion.div
      className="scene intro-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <Sparkles />
      <FallingHearts />

      <motion.div
        className="intro-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="intro-subtitle">
          A Journey Of My Heart
        </p>

        <h1 className="intro-title">
          You Are<br />
          Everything To Me
        </h1>

        <motion.button
          className="gift-button"
          onClick={onNext}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          🎁
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
