// app/page.tsx
"use client";

import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import ContentGenerator from "./components/ContentGenerator";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#101010",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatedBackground />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ my: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{ color: "#3dc9b3" }}
            >
              🚀 Content Generator ✨
            </Typography>
          </motion.div>
          <ContentGenerator />
        </Box>
      </Container>
    </Box>
  );
}
