"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function Greet() {
	const trpc = useTRPC();

	const greeting = useQuery(trpc.test.queryOptions({ msg: "hi" }));
	console.log(greeting);

	return <div>{JSON.stringify(greeting.data)}</div>;
}
