import { appRouter } from "@canvio/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const server = createHTTPServer({
	router: appRouter,
});

server.listen(3001);
