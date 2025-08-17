"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    // link/button ustida hoverni aniqlash
    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-[9999] 
        transition-transform duration-200 ease-out`}
      style={{
        transform: `translate(${pos.x - 15}px, ${pos.y - 15}px)`,
      }}
    >
      {/* Tashqi doira */}
      <div
        className={`w-8 h-8 rounded-full border-2 border-emerald-400 
          transition-all duration-200 ease-out
          ${hover ? "scale-150 border-emerald-300" : "scale-100"}`}
      ></div>

      {/* Ichki nuqta */}
      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
