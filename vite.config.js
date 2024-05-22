import { defineConfig } from "vite";

export default defineConfig({
  // change to "./" for npm run dev
  base: "/portfolio",
  build: {
    // bug w kaboom w esbuild
    minify: 'terser',
  }
})
