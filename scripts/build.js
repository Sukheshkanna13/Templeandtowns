const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

// Step 1: Clean dist/ entirely
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Step 2: Run Vite build (outputs directly to dist/)
console.log("Building React app with Vite to dist/ for root domain...");
execSync("npx vite build", { cwd: root, stdio: "inherit" });

console.log("\n✅ Build complete! Upload the entire contents of dist/ directly to public_html/");
console.log("   Upload all files inside dist/ → domain.com/");
