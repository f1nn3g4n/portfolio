import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio",
  build: {
    // bug w kaboom w esbuild
    minify: 'terser',
  }
})
