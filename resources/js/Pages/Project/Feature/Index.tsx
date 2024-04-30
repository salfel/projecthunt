import BaseLayout from "@/Layouts/BaseLayout";
import ProjectLayout from "@/Layouts/ProjectLayout";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import type { Feature, PageProps, Project } from "@/types";
import { Link } from "@inertiajs/react";
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
