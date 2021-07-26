import { Database, SQLite3Connector } from "./deps.ts";
import User from "./domain/User.ts";

const connector = new SQLite3Connector({
  filepath: "./first.sqlite",
});

const db = new Database(connector);
db.link([User]);
export default db;
