import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    // bug w kaboom w esbuild
    minify: 'terser',
  }
})