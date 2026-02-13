import { motion } from "framer-motion";

export default function Walk({ onComplete }) {
  return (
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: window.innerWidth }}
        transition={{ duration: 5, ease: "linear" }}
        onAnimationComplete={onComplete}
        style={{
          width:80,
          height:80,
          background:"pink",
          borderRadius:"50%",
          position:"absolute",
          bottom:100
        }}
      />
    </div>
  );
}
