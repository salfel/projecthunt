import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import type { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import type React from "react";
import { useEffect } from "react";

export default function BaseLayout({
	children,
}: { children: React.ReactNode }) {
	const page = usePage<PageProps>();
	const { toast } = useToast();

	useEffect(() => {
		if (page.props.toast) {
			toast({
				variant: page.props.toast.type,
				title: page.props.toast.title,
				description: page.props.toast.description,
			});
		}
	}, [page.props.toast, toast]);

	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 dark:text-white">
			<Header />

			<main className="flex flex-col w-full flex-1 max-w-5xl mx-auto mb-8 px-5">
				{children}
				<Toaster />
			</main>
		</div>
	);
}
