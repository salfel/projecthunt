import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BaseLayout from "@/Layouts/BaseLayout";
import type { Project } from "@/types";
import { useForm } from "@inertiajs/react";
import type { FormEvent, ReactNode } from "react";

type Props = {
	project: Project;
};

function Create({ project }: Props) {
	const { data, setData, errors, post, processing } = useForm({
		name: "",
		description: "",
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		post(route("projects.features.store", [project.id]));
	}

	return (
		<div className="space-y-3">
			<div className="space-y-1.5">
				<h1 className="font-semibold tracking-tight leading-none">
					Create Feature
				</h1>

				<p className="text-sm text-zinc-500 dark:text-zinc-400">
					Create a new Feature to show off your amazing project to
					others
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
						setData={(e) => setData("description", e.target.value)}
					/>
				</FormField>

				<Button type="submit" size="sm" disabled={processing}>
					Create Project
				</Button>
			</form>
		</div>
	);
}

Create.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export default Create;
