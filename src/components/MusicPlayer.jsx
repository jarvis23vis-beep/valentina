import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [canAutoPlay, setCanAutoPlay] = useState(false);

  useEffect(() => {
    // Try to autoplay on load
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setCanAutoPlay(true);
          })
          .catch(() => {
            // Autoplay was blocked, will play on first interaction
            setCanAutoPlay(false);
          });
      }
    }
  }, []);

  // Play on first user interaction if autoplay was blocked
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !canAutoPlay) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setCanAutoPlay(true);
        }).catch(() => {
          console.log("Audio play failed");
        });
      }
      // Remove listeners after first interaction
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keypress", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    if (!canAutoPlay) {
      document.addEventListener("click", handleInteraction);
      document.addEventListener("keypress", handleInteraction);
      document.addEventListener("touchstart", handleInteraction);

      return () => {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keypress", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      };
    }
  }, [canAutoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music.mp3`}
        loop
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <motion.button
        className="music-button"
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? "🎵" : "🔇"}
      </motion.button>
    </>
  );
}
