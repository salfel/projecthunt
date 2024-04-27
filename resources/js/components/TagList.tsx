import { Badge } from "@/components/ui/badge";
import { Link } from "@inertiajs/react";

export default function TagList({ tags }: { tags: string[] }) {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Link
					key={tag}
					href={`${route("projects.index")}?q=${encodeURIComponent(
						tag,
					)}`}
				>
					<Badge>{tag}</Badge>
				</Link>
			))}
		</div>
	);
}
