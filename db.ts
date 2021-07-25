import { Database, SQLite3Connector } from "./deps.ts";

const connector = new SQLite3Connector({
  filepath: "./first.sqlite",
});

export default new Database(connector);
