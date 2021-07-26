import db from "./db.ts";
console.log("Database initializing...");
try {
  await db.sync();
  console.log("Database initialized!");
} catch (e) {
  console.log(e);
}
Deno.exit(0);
