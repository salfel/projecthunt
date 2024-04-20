import { Card } from "@/components/ui/card";
import { Head } from "@inertiajs/react";
import type React from "react";

export default function AuthLayout({
	children,
	title = "",
}: { children: React.ReactNode; title?: string }) {
	return (
		<>
			<Head title={title} />
			<div className="min-h-screen flex justify-center items-center bg-white dark:bg-zinc-950">
				{children}
			</div>
		</>
	);
}
