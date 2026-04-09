import { withCatch } from "@canvio/util/withCatch";
import "@canvio/env/loader";
import { wsEnv } from "@canvio/env/ws-server";
import { parse } from "cookie";
import { WebSocketServer } from "ws";
import { ConnectionManger } from "./service/connectionManager";
import { JwtService } from "./utils";
import "./store/data";

const wss = new WebSocketServer({ port: wsEnv.WS_PORT });

wss.on("connection", async (socket, request) => {
	const cookies = request.headers.cookie;
	const parsedCookies = parse(cookies as string);
	const token = parsedCookies.token;

	if (!token) return;

	const [jwtError, jwtResult] = await withCatch(JwtService.verify(token));

	if (jwtError) {
		return;
	}

	const userId = jwtResult.payload.userId;

	const _ = new ConnectionManger(socket, userId);
});
