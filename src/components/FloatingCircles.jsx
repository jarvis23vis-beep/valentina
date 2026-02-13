import { motion } from "framer-motion";

export default function FloatingCircles() {
  const circles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="floating-circles">
      {circles.map((i) => (
        <motion.div
          key={i}
          className="circle"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          animate={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
