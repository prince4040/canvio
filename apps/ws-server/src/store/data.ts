import type { RoomSockets, Sockets, UserSockets } from "./../types";

export const sockets: Sockets = new Map();
export const userSockets: UserSockets = new Map();
export const roomSockets: RoomSockets = new Map();
