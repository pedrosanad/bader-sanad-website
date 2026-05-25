import { build } from "esbuild";
import { execSync } from "child_process";

// Build frontend
execSync("vite build", { stdio: "inherit" });

// Build server — keep all node_modules external, only bundle our source
await build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "dist/index.js",
  packages: "external",
});

console.log("Build complete");
