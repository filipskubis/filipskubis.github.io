import React, { useState, useEffect, useRef } from "react";

const SoundPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(url);

    // Handle when audio finishes playing
    const handleEnded = () => setIsPlaying(false);
    audioRef.current.addEventListener("ended", handleEnded);

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current = null;
      }
    };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  console.log(audioRef.current);
  return (
    <button
      onClick={togglePlay}
      className={`px-8 py-4 rounded-lg transition-transform  cursor-pointer ${
        isPlaying
          ? "bg-blue-700 hover:-translate-y-1"
          : "bg-blue-500 hover:-translate-y-1"
      } text-white`}
    >
      {isPlaying ? "Stop" : `Play sound`}
    </button>
  );
};

export default SoundPlayer;
