import type { Project } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
    StarIcon,
    StarFilledIcon,
    GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { Link } from "@inertiajs/react";

export default function Actions({
    project,
    starred,
}: { project: Project; starred: boolean }) {
    return (
        <div className="absolute top-0 right-5 !m-0 flex items-center gap-1">
            {project.demo && (
                <a
                    href={project.demo}
                    className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                    })}
                >
                    <Globe className="size-5" />
                </a>
            )}
            <Link
                href={route("projects.star", [project.id])}
                method="post"
                as="button"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
                {starred ? (
                    <StarFilledIcon className="size-5 text-yellow-500" />
                ) : (
                    <StarIcon className="size-5" />
                )}
            </Link>
            <a
                href={`https://github.com/${project.full_name}`}
                className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
                <GitHubLogoIcon className="size-5" />
            </a>
        </div>
    );
}
