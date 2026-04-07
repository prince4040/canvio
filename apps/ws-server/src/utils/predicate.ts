export function isValidRequestId(
	data: unknown,
): data is { payload: { requestId: string | undefined } } {
	return (
		typeof data === "object" &&
		data !== null &&
		"payload" in data &&
		typeof data.payload === "object" &&
		data.payload !== null &&
		"requestId" in data.payload &&
		typeof data.payload.requestId === "string"
	);
}
