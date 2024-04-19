import { Link } from "@inertiajs/react";
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

function Header() {
	return (
		<header className="py-6 mb-8 border-b border-b-zinc-700">
			<div className="w-full max-w-5xl mx-auto px-5">
				<h3 className="text-2xl font-semibold">
					<Link href={route("home")}>ProjectHunt</Link>
				</h3>
			</div>
		</header>
	);
}
