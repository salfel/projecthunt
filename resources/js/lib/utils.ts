import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function updateSearchParam(key, value) {
	if (typeof window !== "undefined") {
		const params = new URLSearchParams(window.location.search);
		params.set(key, value);

		// Update the URL without causing a navigation event
		window.history.pushState(
			{},
			"",
			`${window.location.pathname}?${params}`,
		);
	}
}
