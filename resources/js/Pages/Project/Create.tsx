import BaseLayout from "@/Layouts/BaseLayout";
import FormField from "@/components/FormField";
import TagsInput from "@/components/Project/TagInput";
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
import { Head, useForm, usePage } from "@inertiajs/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { FormEvent, ReactNode } from "react";

interface Props extends PageProps {
    repos: string[];
    tags: string[];
}

type FormProps = {
    name: string;
    description: string;
    demo: string;
    tags: string[];
};

const Create = ({ repos }: Props) => {
    const page = usePage();
    const { data, setData, post } = useForm<FormProps>({
        name: "",
        description: "",
        demo: "",
        tags: [],
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post(route("projects.store"));
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
                    <div className="flex justify-between gap-5">
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
                            error={page.props.errors.demo}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
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

                        {page.props.errors.description && (
                            <span className="text-red-500 text-sm">
                                {page.props.errors.description}
                            </span>
                        )}
                    </div>

                    <TagsInput tags={data.tags} setData={setData} />

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
