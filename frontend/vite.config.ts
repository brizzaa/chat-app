import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  base: "/",
  server: {
    port: 5173,
    open: true,

    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  preview: {
    port: 5173,
    open: true,
  },
});
