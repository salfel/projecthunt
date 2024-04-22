import BaseLayout from "@/Layouts/BaseLayout";
import TagsInput from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { atom, useAtomValue } from "jotai";
import React, { type FormEvent, useState } from "react";

interface Props extends PageProps {
	repos: string[];
	tags: string[];
}

const tagsAtom = atom([]);

const Create = ({ repos, tags: defaultTags }: Props) => {
	const [name, setName] = useState(repos[0]);
	const [description, setDescription] = useState("");
	const tags = useAtomValue(tagsAtom);
	const page = usePage();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		router.post(route("project.store"), {
			repo: name,
			tags,
		});
	}

	return (
		<>
			<Head title="Create Project" />
			<div className="space-y-6">
				<div className="space-y-2">
					<h1 className="text-xl font-semibold">Create Project</h1>
					<p className="w-[60ch] text-zinc-200">
						Select a Github repository to create a new project and
						share the project with people all over the world
					</p>
				</div>
				<form onSubmit={handleSubmit} className="w-96 space-y-5">
					<div className="space-y-1">
						<Label htmlFor="repository">Repository</Label>
						<SelectRepo
							repos={repos}
							value={name}
							onChange={setName}
						/>
						{page.props.errors.name && (
							<span className="text-red-500 text-sm">
								{page.props.errors.name}
							</span>
						)}
					</div>

					<div className="space-y-1">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						{page.props.errors.description && (
							<span className="text-red-500 text-sm">
								{page.props.errors.description}
							</span>
						)}
					</div>

					<div className="space-y-1">
						<Label htmlFor="tags">Tags</Label>
						<TagsInput
							defaultTags={defaultTags}
							tagsAtom={tagsAtom}
						/>

						{page.props.errors.tags && (
							<span className="text-red-500 text-sm">
								{page.props.errors.tags}
							</span>
						)}
					</div>

					<Button type="submit">Create Project</Button>
				</form>
			</div>
		</>
	);
};

function SelectRepo({
	repos,
	value,
	onChange,
}: { repos: string[]; value: string; onChange: (repo: string) => void }) {
	return (
		<Select onValueChange={onChange}>
			<SelectTrigger id="repository" className="w-96">
				<SelectValue placeholder="Select your Github repo..." />
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
