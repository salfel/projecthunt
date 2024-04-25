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

export default function ProjectPreview({ project }: { project: Project }) {
	return (
		<Card className="h-full">
			<CardHeader>
				<Link href={route("projects.show", [project.id])}>
					<CardTitle>{project.name}</CardTitle>
				</Link>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<TagList tags={project.tags} />
			</CardContent>
		</Card>
	);
}
