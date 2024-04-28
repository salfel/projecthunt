import BaseLayout from "@/Layouts/BaseLayout";
import ProjectLayout from "@/Layouts/ProjectLayout";
import type { ReactNode } from "react";

function Features() {
    return <div>Feature</div>;
}

Features.layout = (page: ReactNode) => (
    <BaseLayout>
        <ProjectLayout>{page}</ProjectLayout>
    </BaseLayout>
);

export default Features;
