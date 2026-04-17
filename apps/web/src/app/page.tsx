"use client";

import { Button } from "@repo/ui/components/button";

export default function Home() {
	return (
		<div>
			<Button
				className="cursor-pointer"
				onClick={() => {
					alert("hello");
				}}
			>
				click me
			</Button>
		</div>
	);
}
