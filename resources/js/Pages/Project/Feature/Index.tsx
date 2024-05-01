import BaseLayout from "@/Layouts/BaseLayout";
import ProjectLayout from "@/Layouts/ProjectLayout";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Feature as FeatureType, PageProps, Project } from "@/types";
import { Link } from "@inertiajs/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Pencil, Settings, Trash } from "lucide-react";
import type { ReactNode } from "react";

interface Props extends PageProps {
	project: Project;
}

function Features({ project, auth }: Props) {
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<h1>Feature list</h1>

				{auth.user?.id === project?.user?.id && (
					<Link
						href={route("projects.features.create", [project.id])}
						className={buttonVariants()}
					>
						Create Feature
					</Link>
				)}
			</div>

			<FeatureList features={project.features} />
		</div>
	);
}

function FeatureList({ features }: { features: FeatureType[] }) {
	return (
		<Accordion type="multiple" className="space-y-5">
			{features.map((feature) => (
				<Feature feature={feature} key={feature.id} />
			))}
		</Accordion>
	);
}

function Feature({ feature }: { feature: FeatureType }) {
	return (
		<AccordionItem value={feature.name} key={feature.id}>
			<div className="flex items-center gap-3">
				<AccordionTrigger className="font-semibold flex-1">
					<div className="flex-1 text-start">{feature.name}</div>
				</AccordionTrigger>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button type="button">
							<Settings className="size-4" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" sideOffset={12}>
						<DropdownMenuLabel>Settings</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								className="flex items-center gap-3"
								asChild
							>
								<Link
									href={route("features.edit", [feature.id])}
								>
									<Pencil className="size-4" />
									<span>Edit</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="space-x-3 text-red-500 hover:!text-red-600 dark:hover:!text-red-400"
								asChild
							>
								<Link
									href={route("features.destroy", [
										feature.id,
									])}
									method="delete"
									as="button"
									className="w-full"
								>
									<Trash className="size-4" />
									<span>Delete</span>
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<AccordionContent>
				<p>{feature.description}</p>
			</AccordionContent>
		</AccordionItem>
	);
}

Features.layout = (page: ReactNode) => (
	<BaseLayout>
		<ProjectLayout>{page}</ProjectLayout>
	</BaseLayout>
);

export default Features;
