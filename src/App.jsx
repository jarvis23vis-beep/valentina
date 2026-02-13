import { useState } from "react";
import { motion } from "framer-motion";
import Proposal from "./scenes/Proposal";
import Intro from "./scenes/Intro";
import Gift from "./scenes/Gift";
import Gallery from "./scenes/Gallery";
import Messages from "./scenes/Messages";
import End from "./scenes/End";
import MusicPlayer from "./components/MusicPlayer";
import "./App.css";

export default function App() {
  const [scene, setScene] = useState("proposal");
  const [photos, setPhotos] = useState([]);

  return (
    <div className="app-container">
      <MusicPlayer />
      {scene === "proposal" && <Proposal onYes={() => setScene("intro")} />}
      {scene === "intro" && <Intro onNext={() => setScene("gift")} />}
      {scene === "gift" && <Gift onNext={() => setScene("gallery")} />}
      {scene === "gallery" && (
        <Gallery photos={photos} setPhotos={setPhotos} onNext={() => setScene("messages")} />
      )}
      {scene === "messages" && <Messages onNext={() => setScene("end")} />}
      {scene === "end" && <End onReset={() => setScene("proposal")} />}
    </div>
  );
}
