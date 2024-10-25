import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  // minify: true,
  // minifySyntax: true,
  // minifyWhitespace: true,
  treeshake: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  platform: "browser",
  // @ts-ignore
  format: ["cjs", "esm", "umd"],
  globalName: "CarvIdSDK",
  // legacyOutput: true,
  outExtension({ format }) {
    return {
      js:
        { cjs: ".cjs", esm: ".mjs", umd: ".umd.js", iife: ".iife.js" }[
          format
        ] || `.${format}.js`,
    };
  },
  publicDir: "./public",
  outDir: "./dist",
});
