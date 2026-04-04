import type { WebSocket } from "ws";

export type SocketId = string;
export type UserId = string;
export type RoomId = string;

export type UserConnection = {
	socketId: SocketId;
	userId: UserId;
	socket: WebSocket;
	rooms: Set<RoomId>;
	isAlive: boolean;
	createAt: Date;
};

export type Sockets = Map<SocketId, UserConnection>;
export type UserSockets = Map<UserId, Set<SocketId>>;
export type RoomSockets = Map<RoomId, Set<SocketId>>;
