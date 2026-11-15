// The verified facts live in ONE place: frontend/lib/content.ts. The chatbot needs the same file,
// so this copies it to backend/src/data/content.ts (git-ignored) before every dev / build / typecheck.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const from = resolve(here, "../../frontend/lib/content.ts");
const to = resolve(here, "../src/data/content.ts");
mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log("content synced: frontend/lib/content.ts -> backend/src/data/content.ts");
