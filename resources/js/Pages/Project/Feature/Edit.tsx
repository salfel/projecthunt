import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BaseLayout from "@/Layouts/BaseLayout";
import type { Feature } from "@/types";
import { useForm } from "@inertiajs/react";
import type { FormEvent, ReactNode } from "react";

type Props = {
    feature: Feature;
};

function Create({ feature }: Props) {
    const { data, setData, errors, put, processing } = useForm({
        name: feature.name,
        description: feature.description,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        put(route("features.update", [feature.id]));
    }

    return (
        <div className="space-y-3">
            <div className="space-y-1.5">
                <h1 className="font-semibold tracking-tight leading-none">
                    Update Feature
                </h1>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Update your Feature to better describe what your application
                    can do
                </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <FormField
                    id="name"
                    label="Name"
                    value={data.name}
                    setData={setData}
                    error={errors.name}
                />

                <FormField
                    id="description"
                    label="Description"
                    error={errors.description}
                >
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                </FormField>

                <Button type="submit" size="sm" disabled={processing}>
                    Update Project
                </Button>
            </form>
        </div>
    );
}

Create.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export default Create;
