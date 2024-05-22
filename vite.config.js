import { defineConfig } from "vite";
import { config } from "./vite.config.local.js";

export default defineConfig(
  config
    ? config
    : {
        base: "/portfolio",
        build: {
          // bug w kaboom w esbuild
          minify: "terser",
        },
      },
);
