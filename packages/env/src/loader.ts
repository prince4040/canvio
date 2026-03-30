// packages/env/src/loader.ts

import fs from "node:fs";
import path from "node:path";

const files = [".env", ".env.local"];
const cwd = process.cwd();

for (const file of files) {
	const filePath = path.resolve(cwd, file);
	if (!fs.existsSync(filePath)) continue;

	const content = fs.readFileSync(filePath, "utf-8");

	for (const line of content.split("\n")) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;

		const eqIndex = trimmed.indexOf("=");
		if (eqIndex === -1) continue;

		const key = trimmed.slice(0, eqIndex).trim();
		const value = trimmed
			.slice(eqIndex + 1)
			.trim()
			.replace(/^['"]|['"]$/g, "");

		if (key in process.env) continue; // never override real env

		process.env[key] = value;
	}
}
