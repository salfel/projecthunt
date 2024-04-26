import BaseLayout from "@/Layouts/BaseLayout";
import FormField from "@/components/FormField";
import TagsInput from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Head, useForm, usePage } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { atom, useAtom } from "jotai";
import { useEffect, type FormEvent, type ReactNode } from "react";

interface Props extends PageProps {
	repos: string[];
	tags: string[];
}

const tagsAtom = atom<string[]>([]);

type FormProps = {
	name: string;
	description: string;
	demo: string;
	useGithubDesc: boolean;
	tags: string[];
};

const Create = ({ repos, tags: defaultTags }: Props) => {
	const page = usePage();
	const { data, setData, post } = useForm<FormProps>({
		name: "",
		description: "",
		demo: "",
		useGithubDesc: false,
		tags: [],
	});
	const [tags, setTags] = useAtom(tagsAtom);

	useEffect(() => {
		setData("tags", tags);
	}, [tags, setData]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		post(route("projects.store"), {
			onSuccess: () => {
				setTags([]);
			},
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
				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="flex items-center justify-between gap-5">
						<div className="space-y-1 w-full">
							<Label htmlFor="repository" required>
								Repository
							</Label>
							<SelectRepo
								repos={repos}
								value={data.name}
								onChange={(name) => setData({ ...data, name })}
							/>
							{page.props.errors.name && (
								<span className="text-red-500 text-sm">
									{page.props.errors.name}
								</span>
							)}
						</div>

						<FormField
							id="demo"
							label="Demo"
							placeholder="https://example.com"
							value={data.demo}
							setData={setData}
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="description">Description</Label>
						{!data.useGithubDesc && (
							<Textarea
								id="description"
								value={data.description}
								onChange={(e) =>
									setData({
										...data,
										description: e.target.value,
									})
								}
								rows={4}
							/>
						)}

						<div className="flex items-center gap-2 !mt-3 !mb-2">
							<Checkbox
								id="useGithubDesc"
								checked={data.useGithubDesc}
								onCheckedChange={(checked) =>
									setData({
										...data,
										useGithubDesc: !!checked,
									})
								}
							/>

							<Label htmlFor="useGithubDesc">
								Use Github description
							</Label>
						</div>

						{page.props.errors.description && (
							<span className="text-red-500 text-sm">
								{page.props.errors.description}
							</span>
						)}
					</div>

					<div className="space-y-1">
						<Label htmlFor="tags" required>
							Tags
						</Label>
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
	onChange,
}: { repos: string[]; value: string; onChange: (repo: string) => void }) {
	return (
		<Select onValueChange={onChange}>
			<SelectTrigger id="repository">
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

Create.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;

export default Create;
