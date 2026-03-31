import { appRouter } from "@canvio/trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { createContext } from "./context";

const server = createHTTPServer({
	router: appRouter,
	createContext,
});

server.listen(3001);
