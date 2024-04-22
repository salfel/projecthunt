import BaseLayout from "@/Layouts/BaseLayout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PageProps, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

interface Props extends PageProps {
	project: Project;
}

const Show = ({ project }: Props) => {
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
			</div>
		</>
	);
};

Show.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Show;
