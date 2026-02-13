import { motion } from "framer-motion";
import FloatingCircles from "../components/FloatingCircles";
import Sparkles from "../components/Sparkles";
import FallingHearts from "../components/FallingHearts";

const messages = [
  "You are the meaning of my existence 💫",
  "Every heartbeat whispers your name 💓",
  "In you, I found my forever 💕",
  "You are my reason to breathe 🌹",
  "Distance means nothing when someone means everything 💑",
  "With you, every moment becomes a beautiful memory 😊✨",
];

export default function Messages({ onNext }) {
  return (
    <motion.div
      className="scene messages-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <FallingHearts />
      <Sparkles />

      <motion.div className="messages-container">
        <motion.h2
          className="messages-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What You Mean To Me
        </motion.h2>

        <div className="messages-grid">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className="message-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {msg}
            </motion.div>
          ))}
        </div>

        <motion.button
          className="reset-button"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Continue to Final Message
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
