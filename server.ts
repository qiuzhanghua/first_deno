import { Application, helpers, Router, send } from "./deps.ts";
import User from "./domain/User.ts";

const app = new Application();

const router = new Router();
// router
//   .get("/", (ctx) => {
//     db.ping()
//       .then((res) => ctx.response.body = "Hello world!" + res)
//       .catch((err) => {
//         ctx.response.body = err;
//       });
//     ctx.response.body = "Hello world!" + db.ping();
//   });

router.get("/users", async (ctx) => {
  ctx.response.body = await User.all();
});

router.get("/users/:userId", async (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  const user = await User.find(userId);
  if (user) {
    ctx.response.body = user;
  } else {
    ctx.response.status = 404;
    ctx.response.body = { userId: userId };
  }
});

router.post("/users", async (ctx) => {
  const { value } = ctx.request.body({ type: "json" });
  const { name, email } = await value;
  const user = new User();
  user.name = name;
  user.email = email;
  try {
    await user.save();
    ctx.response.body = user;
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = { error: e };
  }
});

router.put("/users/:userId", async (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  const { value } = ctx.request.body({ type: "json" });
  const { name, email } = await value;
  let user = await User.find(userId);
  let found = true;
  if (!user) {
    user = new User();
    found = false;
  }
  //  console.log(user);
  user.name = name;
  user.email = email;
  if (found) {
    await user.update();
  } else {
    try {
      // user.id = userId;
      await user.save();
      ctx.response.body = user;
    } catch (e) {
      ctx.response.status = 500;
      ctx.response.body = { error: e };
    }
  }
});

router.delete("/users/:userId", async (ctx) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  const user = await User.find(userId);
  if (user) {
    await user.delete();
    ctx.response.body = { userId: userId };
  } else {
    ctx.response.status = 404;
  }
});

app.use(router.routes());
app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
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
const port = Number(Deno.env.get("PORT")) || 8000;
await app.listen({ port: port });
