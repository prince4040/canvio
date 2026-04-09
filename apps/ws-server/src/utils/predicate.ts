export function isValidRequestId(
	data: unknown,
): data is { meta: { requestId: string | undefined } } {
	return (
		typeof data === "object" &&
		data !== null &&
		"meta" in data &&
		typeof data.meta === "object" &&
		data.meta !== null &&
		"requestId" in data.meta &&
		typeof data.meta.requestId === "string"
	);
}
