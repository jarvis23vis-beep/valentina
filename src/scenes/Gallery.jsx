import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FloatingCircles from "../components/FloatingCircles";
import Sparkles from "../components/Sparkles";
import FallingHearts from "../components/FallingHearts";

export default function Gallery({ photos, setPhotos, onNext }) {
  useEffect(() => {
    // Auto-load images from public folder
    const imageFiles = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"];
    const basePath = import.meta.env.BASE_URL;
    const loadedPhotos = imageFiles.map((file) => `${basePath}${file}`);
    setPhotos(loadedPhotos);
  }, []);

  return (
    <motion.div
      className="scene gallery-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <FallingHearts />
      <Sparkles />

      <motion.div
        className="gallery-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="gallery-title">A Walk in My Heart</h2>
        <p className="gallery-subtitle">Every moment with you is forever etched in my soul</p>

        {photos.length > 0 && (
          <motion.div
            className="photos-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                className="photo-item"
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.08, rotate: 2 }}
              >
                <div className="photo-frame">
                  <img src={photo} alt={`Memory ${idx + 1}`} />
                  <div className="photo-overlay">
                    <span className="photo-number">{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.button
          className="continue-button"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: photos.length * 0.15 + 0.5, duration: 0.6 }}
        >
          Continue to Messages
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
