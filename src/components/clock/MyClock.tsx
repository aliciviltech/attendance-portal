"use client";

import React, { useEffect, useState } from "react";

export default function MyClock() {
  // size control
  const SIZE = 250; // max size (px)
  const RADIUS = SIZE / 2;

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    // update every 200ms for smooth-ish animation (you can set 1000 for ticking)
    const id = setInterval(() => setNow(new Date()), 200);
    return () => clearInterval(id);
  }, []);

  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  // degrees
  const secondDeg = seconds * 6; // 360/60
  const minuteDeg = minutes * 6; // 360/60
  const hourDeg = hours * 30; // 360/12

  const digital = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // helper to render 12 hour ticks
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const angle = i * 30;
    // small offset so ticks don't sit flush with edge
    const tickTranslate = RADIUS - 18; // px outward from center
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: i % 3 === 0 ? 4 : 1, // longer ticks at 3/6/9/12 if you like
          height: i % 3 === 0 ? 18 : 10,
          background: "black",
          transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(-${tickTranslate}px)`,
          borderRadius: 2,
          opacity: 0.95,
        }}
      />
    );
  });

  // hand styles (positioned so their bottom (origin) is at center)
  const handCommonBase: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transformOrigin: "50% 100%", // pivot at bottom center of the element
    borderRadius: 999,
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Outer wrapper (max 300px) */}
      <div
        style={{ width: SIZE, height: SIZE }}
        className="relative rounded-full shadow-lg border border-gray-300"
      >
        

        {/* subtle inner ring to give depth */}
        <div
          className="absolute rounded-full"
          style={{
            left: "6px",
            top: "6px",
            right: "6px",
            bottom: "6px",
            border: "1px solid rgba(255,255,255,0.06)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Hour marks (white lines) */}
        {ticks}

        {/* Hands (placed after ticks to appear above) */}
        {/* Hour hand - small - black */}
        <div
          style={{
            ...handCommonBase,
            width: 6,
            height: RADIUS * 0.45, // ~45% radius
            background: "#111827", // black-ish
            transform: `translate(-50%,-100%) rotate(${hourDeg}deg)`,
            zIndex: 20,
            boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            transition: "transform 180ms linear",
          }}
        />

        {/* Minute hand - medium - light blue */}
        <div
          style={{
            ...handCommonBase,
            width: 4,
            height: RADIUS * 0.62, // ~62% radius
            background: "#7dd3fc", // light blue
            transform: `translate(-50%,-100%) rotate(${minuteDeg}deg)`,
            zIndex: 22,
            boxShadow: "0 2px 10px rgba(125,211,252,0.15)",
            transition: "transform 120ms linear",
          }}
        />

        {/* Second hand - long - pink */}
        <div
          style={{
            ...handCommonBase,
            width: 2,
            height: RADIUS * 0.82, // ~82% radius
            background: "#fb7185", // pink
            transform: `translate(-50%,-100%) rotate(${secondDeg}deg)`,
            zIndex: 24,
            boxShadow: "0 1px 6px rgba(251,113,133,0.18)",
            transition: "transform 80ms linear",
          }}
        />

        {/* center hub (white circle) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: 20,
            height: 20,
            background: "white",
            borderRadius: "50%",
            zIndex: 30,
            boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* tiny accent dot */}
          <div
            style={{
              width: 6,
              height: 6,
              background: "#f3f4f6",
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* Digital clock below */}
      <div className="mt-4 w-[200px] text-black text-center font-mono text-lg bg-white px-4 py-2 rounded-lg shadow-md">
        {digital}
      </div>
    </div>
  );
}
