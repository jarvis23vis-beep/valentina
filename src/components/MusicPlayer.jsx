import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

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
            // show an overlay/button for mobile users
            setShowOverlay(true);
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
          setShowOverlay(false);
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
      // pointerdown is useful on some browsers for first gesture
      document.addEventListener("pointerdown", handleInteraction);

      return () => {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("keypress", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
        document.removeEventListener("pointerdown", handleInteraction);
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
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                setCanAutoPlay(true);
                setShowOverlay(false);
              }).catch(() => {
                // fallback: hide overlay so user can use control
                setShowOverlay(false);
              });
            } else {
              setShowOverlay(false);
            }
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg, #e74c3c 0%, #ff6b6b 100%)",
              color: "white",
              border: "none",
              padding: "18px 28px",
              borderRadius: 999,
              fontSize: 18,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={() => {
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                  setCanAutoPlay(true);
                  setShowOverlay(false);
                }).catch(() => {
                  setShowOverlay(false);
                });
              }
            }}
          >
            Tap to play music
          </button>
        </div>
      )}
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
