import { createRequire } from "node:module";

type RequireFunction = ReturnType<typeof createRequire>;

// Resolve the Node-style require once, so repeated calls return the same function.
const resolvedRequire: RequireFunction =
	(globalThis as { require?: RequireFunction }).require ??
	createRequire(import.meta.url);

export function getRequire(): RequireFunction {
	return resolvedRequire;
}
