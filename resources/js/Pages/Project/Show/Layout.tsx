import type { ReactNode } from "react";
import NavigationMenu from "./Partials/NavigationMenu";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="space-y-8">
			<NavigationMenu />

			<div>{children}</div>
		</div>
	);
}
