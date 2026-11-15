// Creates the local settings files a fresh clone needs, without overwriting anything that already exists.
//   backend/.env         from backend/.env.example   (and fills in a random AUTH_SECRET)
//   frontend/.env.local  from frontend/.env.example
// Run with: npm run setup   (or automatically as part of it)
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const make = (from, to) => {
  const src = resolve(root, from);
  const dst = resolve(root, to);
  if (existsSync(dst)) return console.log(`kept existing   ${to}`), false;
  copyFileSync(src, dst);
  console.log(`created         ${to}`);
  return true;
};

if (make("backend/.env.example", "backend/.env")) {
  const f = resolve(root, "backend/.env");
  const text = readFileSync(f, "utf8").replace(/^AUTH_SECRET=\s*$/m, `AUTH_SECRET=${randomBytes(32).toString("hex")}`);
  writeFileSync(f, text);
  console.log("                filled in a random AUTH_SECRET");
}
make("frontend/.env.example", "frontend/.env.local");

const env = readFileSync(resolve(root, "backend/.env"), "utf8");
if (/YOUR_PASSWORD/.test(env)) {
  console.log("\nNEXT STEP: open backend/.env and replace YOUR_PASSWORD in DATABASE_URL with your PostgreSQL password,");
  console.log("then run:  npm run db:setup");
}
