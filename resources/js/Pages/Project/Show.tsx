import BaseLayout from "@/Layouts/BaseLayout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { PageProps, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
	GitHubLogoIcon,
	StarFilledIcon,
	StarIcon,
} from "@radix-ui/react-icons";
import React from "react";

interface Props extends PageProps {
	project: Project;
	starred: boolean;
}

const Show = ({ project, starred }: Props) => {
	return (
		<>
			<Head title={project.full_name} />

			<div className="relative space-y-6">
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold">{project.name}</h1>
					<p className="text-lg text-zinc-800 dark:text-zinc-200">
						{project.description}
					</p>
				</div>

				<Separator />

				<div className="flex flex-wrap gap-1">
					{project.tags.map((tag) => (
						<Badge key={tag.id}>{tag.name}</Badge>
					))}
				</div>

				<ProjectActions project={project} starred={starred} />
			</div>
		</>
	);
};

function ProjectActions({
	project,
	starred,
}: { project: Project; starred: boolean }) {
	return (
		<div className="absolute top-0 right-5 !m-0 flex items-center gap-1">
			<Link
				href={route("project.star", [project.id])}
				method="post"
				as="button"
				size="icon"
				variant="outline"
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

Show.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Show;
