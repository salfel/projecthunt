import TagList from "@/components/TagList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";
import { Link } from "@inertiajs/react";
import { StarIcon } from "@radix-ui/react-icons";

export default function ProjectPreview({ project }: { project: Project }) {
	return (
		<Card className="h-full">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<Link
						href={route("projects.user", [project.user?.id])}
						className="flex items-center gap-3"
					>
						<img
							src={project.user?.avatar_url}
							alt={project.user?.name}
							className="size-4"
						/>
						<span className="text-sm font-semibold hover:underline">
							{project.user?.name}
						</span>
					</Link>
					{project.starred_count > 0 && (
						<div className="flex items-center gap-2">
							<StarIcon className="size-4" />
							{project.starred_count}
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<div>
					<Link href={route("projects.show", [project.id])}>
						<CardTitle>{project.name}</CardTitle>
					</Link>
					<CardDescription>{project.description}</CardDescription>
				</div>
				<TagList tags={project.tags} />
			</CardContent>
		</Card>
	);
}
