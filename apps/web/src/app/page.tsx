import { getQueryClient, trpc } from "@/trpc/server";

export default async function Home() {
	const queryClient = getQueryClient();
	// await queryClient.prefetchQuery(trpc);
	return <div>Hi there</div>;
}
