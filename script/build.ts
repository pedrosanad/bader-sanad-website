import { build } from "esbuild";
import { execSync } from "child_process";

// Build frontend
execSync("vite build", { stdio: "inherit" });

// Build server
await build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "dist/index.cjs",
  external: [
    "pg-native",
    "canvas",
    "bufferutil",
    "utf-8-validate",
  ],
});

console.log("Build complete");
