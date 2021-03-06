const fs = require('fs');
const path = require('path');
let pkg = require("../package.json");

delete pkg.devDependencies;

const outputPath = path.join(__dirname, "../release");

if(!fs.existsSync(outputPath)) {
  console.info("Build folder doesn't exist. Creating...");
  fs.mkdirSync(outputPath);
}

const filepath = path.join(outputPath, "package.json");
fs.writeFileSync(filepath, JSON.stringify(pkg, null, 2));