import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { UserCircle } from "lucide-react";
import type React from "react";

export default function Header() {
	return (
		<header className="py-6 mb-8 border-b border-b-zinc-700">
			<div className="w-full max-w-5xl mx-auto px-5 flex items-center justify-between">
				<h3 className="text-2xl font-semibold">
					<Link href={route("home")}>ProjectHunt</Link>
				</h3>

				<div className="flex items-center gap-8">
					<Link
						href={route("project.index")}
						className="text-lg font-semibold"
					>
						Discover
					</Link>

					<Dropdown />
				</div>
			</div>
		</header>
	);
}

function Dropdown() {
	const page = usePage<PageProps>();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserCircle />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40 mt-2">
				{page.props.auth.user ? (
					<>
						<DropdownMenuLabel>
							{page.props.auth.user.name}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href={route("project.create")}>
							<DropdownMenuItem>Create Project</DropdownMenuItem>
						</Link>
						<Link href={route("logout")} method="post">
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</Link>
					</>
				) : (
					<>
						<DropdownMenuLabel>Guest</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href={route("login")}>
							<DropdownMenuItem>Login</DropdownMenuItem>
						</Link>
						<Link href={route("register")}>
							<DropdownMenuItem>Register</DropdownMenuItem>
						</Link>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
