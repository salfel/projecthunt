import BaseLayout from "@/Layouts/BaseLayout";
import TagList from "@/components/TagList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/lib/hooks";
import { setURLSearchParam } from "@/lib/utils";
import type { Project } from "@/types";
import { Link } from "@inertiajs/react";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/reset.css";
import type { Hit } from "instantsearch.js";
import type { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
	import.meta.env.VITE_ALGOLIA_APP_ID,
	import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
	{},
);

const Index = () => {
	const query = useSearchParam("q");

	return (
		<InstantSearch
			indexName="projects"
			searchClient={searchClient}
			initialUiState={{
				projects: {
					query,
				},
			}}
			future={{
				preserveSharedStateOnUnmount: true,
			}}
		>
			<div className="space-y-5">
				<SearchBox />

				<Hits
					classNames={{
						list: "grid grid-cols-2 gap-5",
					}}
					hitComponent={ProjectPreview}
				/>
			</div>
		</InstantSearch>
	);
};

function SearchBox() {
	const { query, refine } = useSearchBox();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		refine(params.get("q") ?? "");
	}, [refine]);

	function search(value: string) {
		setURLSearchParam("q", value);

		refine(value);
	}

	return (
		<div className="relative group">
			<Input
				className="px-4 h-12 text-lg font-medium"
				value={query}
				onChange={(e) => search(e.target.value)}
				placeholder="Search for project..."
			/>

			{query !== "" && (
				<button
					type="button"
					className="absolute top-0 right-3 hidden group-hover:flex items-center h-full"
					onClick={() => search("")}
				>
					<X className="size-4" />
				</button>
			)}
		</div>
	);
}

interface ProjectPreviewProps {
	hit: Hit<{ tags: string[] } & Project>;
	sendEvent: SendEventForHits;
}

function ProjectPreview({ hit: project }: ProjectPreviewProps) {
	let id = 0;
	return (
		<Card className="h-full">
			<CardHeader>
				<Link href={route("project.show", [project.id])}>
					<CardTitle>{project.name}</CardTitle>
				</Link>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<TagList
					tags={project.tags.map((tag) => ({ id: id++, name: tag }))}
				/>
			</CardContent>
		</Card>
	);
}

Index.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Index;
