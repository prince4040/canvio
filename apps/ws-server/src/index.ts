import "@canvio/env/loader";
import { wsEnv } from "@canvio/env/ws-server";
import { parse } from "cookie";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: wsEnv.WS_PORT });

wss.on("connection", (socket, request) => {
	const cookies = request.headers.cookie;
	const parsedCookies = parse(cookies as string);
	const token = parsedCookies.token;
	console.log(token);
});
