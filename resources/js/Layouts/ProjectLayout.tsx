import type { ReactNode } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { PageProps, Project } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Book, Cog } from "lucide-react";

const links = [
    {
        name: "projects.show",
        label: "Home",
        icon: Book,
    },
    {
        name: "projects.features.index",
        label: "Features",
        icon: Cog,
    },
];

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="space-y-8">
            <Navigation />

            <div>{children}</div>
        </div>
    );
}

function Navigation() {
    const page = usePage<PageProps<{ project: Project }>>();

    return (
        <div className="space-y-2">
            <NavigationMenu>
                <NavigationMenuList className="gap-2">
                    {links.map((links) => (
                        <NavigationMenuItem key={links.name}>
                            <Link
                                href={route(links.name, [
                                    page.props.project.id,
                                ])}
                                className={cn(
                                    "flex items-center gap-2",
                                    navigationMenuTriggerStyle(),
                                )}
                                data-active={route().current(links.name)}
                            >
                                <links.icon className="size-4" />
                                <span>{links.label}</span>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            <Separator />
        </div>
    );
}
