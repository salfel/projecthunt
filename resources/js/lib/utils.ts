import type { File } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sortFiles(files: File[]): File[] {
	return files.sort((a, b) => {
		if (a.type === "dir" && b.type === "file") {
			return -1;
		}
		if (b.type === "dir" && a.type === "file") {
			return 1;
		}
		return 0;
	});
}
