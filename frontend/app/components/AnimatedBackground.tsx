// app/components/AnimatedBackground.tsx
"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number }>
  >([]);

  // Generate particles on the client only
  useEffect(() => {
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {particles.map((particle, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: "rgba(61, 201, 179, 0.3)",
            borderRadius: "50%",
            animation: "float 20s infinite",
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </Box>
  );
}
