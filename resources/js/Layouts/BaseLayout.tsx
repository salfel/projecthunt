import Header from "@/components/Header";
import type React from "react";

export default function BaseLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 dark:text-white">
			<Header />

			<main className="flex-1 w-full max-w-5xl mx-auto px-5">
				{children}
			</main>
		</div>
	);
}
