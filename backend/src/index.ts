import { createApp } from "./app.js";
import { assertConfigured } from "./lib/auth.js";
import { db } from "./lib/db.js";

assertConfigured(); // fail fast if production is missing AUTH_SECRET
await db(); // connect and create tables before accepting traffic

const port = Number(process.env.PORT ?? 4000);
createApp().listen(port, () => {
  console.log(`Balaju Heritage API listening on http://localhost:${port}`);
});
