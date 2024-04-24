import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setURLSearchParam(key: string, value: string) {
	let path = window.location.pathname;

	const params = new URLSearchParams(window.location.search);
	if (value === "") {
		params.delete(key);
	} else {
		params.set(key, value);
	}

	if (params.size) {
		path += `?${params}`;
	}

	window.history.pushState({}, "", path);
}
