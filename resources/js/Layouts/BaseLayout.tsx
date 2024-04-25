import Header from "@/components/Header";
import type React from "react";

export default function BaseLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 dark:text-white">
			<Header />

			<main className="flex flex-col w-full flex-1 max-w-5xl mx-auto mb-8 px-5">
				{children}
			</main>
		</div>
	);
}
