import BaseLayout from "@/Layouts/BaseLayout";
import TagsInput from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { PageProps } from "@/types";
import { router } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { atom, useAtomValue } from "jotai";
import React, { type FormEvent, useState } from "react";

interface Props extends PageProps {
	repos: string[];
	tags: string[];
}

const tagsAtom = atom([]);

const Create = ({ repos, tags: defaultTags }: Props) => {
	const [repo, setRepo] = useState(repos[0]);
	const tags = useAtomValue(tagsAtom);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		router.post(route("project.store"), {
			repo,
			tags,
		});
	}

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h1 className="text-xl font-semibold">Create Project</h1>
				<p className="w-[60ch] text-zinc-200">
					Select a Github repository to create a new project and share
					the project with people all over the world
				</p>
			</div>
			<form onSubmit={handleSubmit} className="space-y-5">
				<SelectRepo repos={repos} value={repo} onChange={setRepo} />

				<TagsInput defaultTags={defaultTags} tagsAtom={tagsAtom} />

				<Button type="submit">Create Project</Button>
			</form>
		</div>
	);
};

function SelectRepo({
	repos,
	value,
	onChange,
}: { repos: string[]; value: string; onChange: (repo: string) => void }) {
	return (
		<Select onValueChange={onChange} defaultValue={value}>
			<SelectTrigger className="w-96">
				<SelectValue placeholder="Github repo" />
			</SelectTrigger>
			<SelectContent>
				{repos.map((repo) => (
					<SelectItem key={repo} value={repo}>
						<div className="flex items-center gap-3">
							<GitHubLogoIcon />
							<span>{repo}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

Create.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Create;
