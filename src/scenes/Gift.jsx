import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingCircles from "../components/FloatingCircles";
import Sparkles from "../components/Sparkles";
import FallingHearts from "../components/FallingHearts";

export default function Gift({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  return (
    <motion.div
      className="scene gift-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingCircles />
      <FallingHearts />
      {opened && <Sparkles />}

      <motion.div
        className="gift-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {!opened ? (
            <motion.div
              key="gift-card"
              className="gift-card-wrapper"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="gift-card">
                <div className="heart-icon">❤️</div>
                <p className="click-text">✨ Click To Open ✨</p>
                <motion.button
                  className="note-button"
                  onClick={() => {
                    setOpened(true);
                    setTimeout(() => setShowLetter(true), 800);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  A Note For You
                </motion.button>
              </div>
            </motion.div>
          ) : !showLetter ? (
            <motion.div
              key="opening-animation"
              className="opening-envelope"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, rotateX: 180 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="envelope-front">
                <div className="envelope-flap"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="love-letter"
              className="love-letter-page"
              initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="letter-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="letter-top-decoration">✨ 💕 ✨</div>
                
                <motion.p
                  className="letter-greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Drashti ❤️
                </motion.p>

                <motion.h1
                  className="letter-main-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  I Love You
                </motion.h1>

                <motion.div
                  className="letter-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 1 }}
                >
                  <p className="love-letter-text">
                    Kabhi kabhi distance itna real lagta hai… phone screen ke us paar tum ho, par haath pakadne jitni paas nahi 😔📱. Phir bhi ajeeb si baat hai — din kitna bhi busy ho, mind automatically tumhari taraf hi turn ho jata hai. Jaise life ka background music tum ho 🎶✨.
                  </p>

                  <p className="love-letter-text">
                    Long distance mushkil hai, but sach bolu… isne mujhe samjhaya ki feelings sirf milne se strong nahi hoti, wait karne se hoti hai 🕰️💫. Har good morning text 🌅 aur har late night call 🌙 mere liye normal habit nahi, ek chhota sa milna hota hai.
                  </p>

                  <p className="love-letter-text">
                    Kabhi future imagine karta hu — bina network, bina typing… seedha tum saamne 😊🤍. Aur tab shayad realize hoga ki itne dino ki doori bas ek test thi… jo hum already pass kar chuke honge 💞.
                  </p>

                  <p className="love-letter-text love-letter-closing">
                    Miss you more than I show, and love you more than I say ❤️‍🩹🌹
                  </p>
                </motion.div>

                <div className="letter-bottom-decoration">🌹 💕 🌹</div>

                <motion.p
                  className="letter-signature"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  Forever Yours ❤️
                </motion.p>
              </motion.div>

              <motion.button
                className="letter-next-button"
                onClick={onNext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Memories
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
