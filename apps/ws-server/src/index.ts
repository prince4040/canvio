import "@canvio/env/loader";
import { wsEnv } from "@canvio/env/ws-server";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: wsEnv.WS_PORT });

wss.on("connection", (socket) => {});
