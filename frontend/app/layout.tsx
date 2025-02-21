// app/layout.tsx
"use client";
import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3dc9b3",
    },
    secondary: {
      main: "#309383",
    },
    background: {
      default: "#101010",
      paper: "rgba(225, 225, 225, 0.05)",
    },
    text: {
      primary: "#e1e1e1",
      secondary: "#a1a0a0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#101010",
        },
      },
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
