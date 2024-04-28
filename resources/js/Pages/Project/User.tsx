import BaseLayout from "@/Layouts/BaseLayout";
import Paginator from "@/components/Paginator";
import ProjectPreview from "@/components/ProjectPreview";
import { buttonVariants } from "@/components/ui/button";
import type { Pagination, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";
import type { ReactNode } from "react";

type Props = {
	projects: Pagination<Project>;
};

const User = ({ projects }: Props) => {
	return (
		<>
			<Head title="My Projects" />

			<div className="flex-1 flex flex-col gap-8">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold">My Projects</h1>

					<Link
						href={route("projects.create")}
						className={buttonVariants({ variant: "default" })}
					>
						New Project
					</Link>
				</div>

				<div className="grid grid-cols-2 gap-5">
					{projects.data.map((project) => (
						<ProjectPreview key={project.id} project={project} />
					))}
				</div>

				<Paginator paginator={projects} className="mt-auto" />
			</div>
		</>
	);
};

User.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export default User;
