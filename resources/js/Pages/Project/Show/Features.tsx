import BaseLayout from "@/Layouts/BaseLayout";
import type { ReactNode } from "react";
import Layout from "./Layout";

function Features() {
    return <div>Feature</div>;
}

Features.layout = (page: ReactNode) => (
    <BaseLayout>
        <Layout>{page}</Layout>
    </BaseLayout>
);

export default Features;
