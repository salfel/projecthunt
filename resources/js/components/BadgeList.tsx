import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/types";
import React from "react";

export default function BadgeList({ tags }: { tags: Tag[] }) {
	return (
		<div className="flex flex-wrap gap-1">
			{tags.map((tag) => (
				<Badge key={tag.id}>{tag.name}</Badge>
			))}
		</div>
	);
}
