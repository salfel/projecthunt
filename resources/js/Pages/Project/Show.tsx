import BaseLayout from "@/Layouts/BaseLayout";
import ProjectLayout from "@/Layouts/ProjectLayout";
import TagList from "@/components/Project/TagList";
import { Separator } from "@/components/ui/separator";
import type { PageProps, Project } from "@/types";
import { Head } from "@inertiajs/react";
import type { ReactNode } from "react";
import ProjectActions from "@/components/Project/Actions";

interface Props extends PageProps {
    project: Project;
    starred: boolean;
}

function Show({ project, starred }: Props) {
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

                <TagList tags={project.tags} />

                <ProjectActions project={project} starred={starred} />
            </div>
        </>
    );
}

Show.layout = (page: ReactNode) => (
    <BaseLayout>
        <ProjectLayout>{page}</ProjectLayout>
    </BaseLayout>
);

export default Show;
