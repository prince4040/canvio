import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "@canvio/trpc";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3001);
