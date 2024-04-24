import BaseLayout from "@/Layouts/BaseLayout";
import ProjectPreview from "@/components/ProjectPreview";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/lib/hooks";
import { setURLSearchParam } from "@/lib/utils";
import type { Project } from "@/types";
import algoliasearch from "algoliasearch";
import "instantsearch.css/themes/reset.css";
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
					hitComponent={({ hit }) => (
						<ProjectPreview project={hit as Project} />
					)}
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

Index.layout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Index;
