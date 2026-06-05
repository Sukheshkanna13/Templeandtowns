const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

// Step 1: Clean dist/ entirely
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Step 2: Run Vite build (outputs to dist/test/)
console.log("Building React app with Vite...");
execSync("npx vite build", { cwd: root, stdio: "inherit" });

// Step 3: Copy root index.html (splash page) to dist/
console.log("Copying splash page...");
fs.cpSync(path.join(root, "index.html"), path.join(dist, "index.html"));

console.log("\n✅ Build complete! Upload the contents of dist/ to public_html/");
console.log("   dist/index.html       → domain.com/");
console.log("   dist/test/            → domain.com/test/");
