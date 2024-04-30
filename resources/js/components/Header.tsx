import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/hooks";
import { Link } from "@inertiajs/react";
import { UserCircle } from "lucide-react";

export default function Header() {
    return (
        <header className="py-6 mb-8 border-b border-b-zinc-700">
            <div className="w-full max-w-5xl mx-auto px-5 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">
                    <Link href={route("home")}>ProjectHunt</Link>
                </h3>

                <div className="flex items-center gap-8">
                    <Link
                        href={route("projects.index")}
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
    const user = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {user?.avatar_url ? (
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="size-6 rounded-full"
                    />
                ) : (
                    <UserCircle />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 mt-2">
                {user ? (
                    <>
                        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={route("profile.edit")}>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </Link>
                        <Link href={route("projects.user", [user.id])}>
                            <DropdownMenuItem>My Projects</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="w-full"
                        >
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
