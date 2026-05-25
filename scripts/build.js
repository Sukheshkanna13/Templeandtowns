const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const entries = [
  "index.html",
  "test"
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) continue;

  const destination = path.join(dist, entry);
  fs.cpSync(source, destination, { recursive: true });
}

console.log(`Built static site to ${path.relative(root, dist)}`);
