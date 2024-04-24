import BaseLayout from "@/Layouts/BaseLayout";
import BadgeList from "@/components/BadgeList";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";
import { Link } from "@inertiajs/react";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/reset.css";
import type { Hit } from "instantsearch.js";
import type { SendEventForHits } from "instantsearch.js/es/lib/utils";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
	import.meta.env.VITE_ALGOLIA_APP_ID,
	import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
	{},
);

const Index = () => {
	return (
		<InstantSearch indexName="projects" searchClient={searchClient}>
			<SearchBox
				classNames={{
					input: "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
				}}
				placeholder="Search projects"
			/>

			<Hits
				classNames={{
					list: "space-y-5",
				}}
				hitComponent={ProjectPreview}
			/>
		</InstantSearch>
	);
};

interface ProjectPreviewProps {
	hit: Hit<{ tags: string[] } & Project>;
	sendEvent: SendEventForHits;
}

function ProjectPreview({ hit: project }: ProjectPreviewProps) {
	let id = 0;
	return (
		<Card>
			<CardHeader>
				<Link href={route("project.show", [project.id])}>
					<CardTitle>{project.name}</CardTitle>
				</Link>
				<CardDescription>{project.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<BadgeList
					tags={project.tags.map((tag) => ({ id: id++, name: tag }))}
				/>
			</CardContent>
		</Card>
	);
}

Index.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Index;
