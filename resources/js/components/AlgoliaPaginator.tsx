import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { usePagination } from "react-instantsearch";

export default function AlgoliaPaginator() {
	const { currentRefinement, refine, pages, isFirstPage, isLastPage } =
		usePagination();

	function isActive(page: number): "outline" | "ghost" {
		return page === currentRefinement ? "outline" : "ghost";
	}

	return (
		<div className="mt-full">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								!isFirstPage && refine(currentRefinement - 1)
							}
							href="#"
						/>
					</PaginationItem>
					{pages.map((page) => (
						<PaginationItem key={page}>
							<Button
								variant={isActive(page)}
								onClick={() => refine(page)}
							>
								{page + 1}
							</Button>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={() =>
								!isLastPage && refine(currentRefinement + 1)
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
