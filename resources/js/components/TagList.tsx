import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";

export default function TagList({ tags }: { tags: Tag[] }) {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Link
					key={tag.id}
					href={`${route("project.index")}?q=${encodeURIComponent(
						tag.name,
					)}`}
				>
					<Badge>{tag.name}</Badge>
				</Link>
			))}
		</div>
	);
}
