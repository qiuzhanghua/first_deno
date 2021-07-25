import { Application, Router, send } from "./deps.ts";

import db from "./db.ts";
import User from "./domain/User.ts";

db.link([User]);

// await db.sync({ drop: false });
// const admin = new User();
// admin.name ="admin";
// admin.email = "admin@example.com";
// await admin.save();

const app = new Application();

const router = new Router();
router
  .get("/", (context) => {
    db.ping()
      .then((res) => context.response.body = "Hello world!" + res)
      .catch((err) => {
        context.response.body = err;
      });
    context.response.body = "Hello world!" + db.ping();
  });

app.use(router.routes());
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});
app.addEventListener("error", (e: Event) => {
  console.log(`got ${e.type} event in event handler (main)`);
});
await app.listen({ port: 8000 });
