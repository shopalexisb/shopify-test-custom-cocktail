import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "../extensions/custom-cocktail/assets"),
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/widget.jsx"),
      output: {
        entryFileNames: "widget.js",
        format: "iife",
      },
    },
  },
});
