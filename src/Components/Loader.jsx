import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Player
        autoplay
        loop
        src="/public/enlighen data.json" // Replace with the path to your JSON file
        className="h-56 w-56 md:h-80 md:w-80" // Tailwind classes for size
      />
    </div>
  );
}

export default Loader;
