import { Greet } from "@/components/Greet";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

export default async function Home() {
	prefetch(trpc.test.queryOptions({ msg: "hello" }));

	return (
		<HydrateClient>
			<Greet />
		</HydrateClient>
	);
}
