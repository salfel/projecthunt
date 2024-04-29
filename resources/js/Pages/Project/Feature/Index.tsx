import BaseLayout from "@/Layouts/BaseLayout";
import ProjectLayout from "@/Layouts/ProjectLayout";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import type { Feature, Project } from "@/types";
import type { ReactNode } from "react";

type Props = {
	project: Project;
};

function Features({ project }: Props) {
	return <FeatureList features={project.features} />;
}

function FeatureList({ features }: { features: Feature[] }) {
	return (
		<Accordion type="multiple" className="space-y-5">
			{features.map((feature) => (
				<AccordionItem value={feature.name} key={feature.id}>
					<AccordionTrigger className="font-semibold">
						{feature.name}
					</AccordionTrigger>
					<AccordionContent>
						<p>{feature.description}</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

Features.layout = (page: ReactNode) => (
	<BaseLayout>
		<ProjectLayout>{page}</ProjectLayout>
	</BaseLayout>
);

export default Features;
