import type { Pagination as PaginationType } from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

type Props<T> = {
    paginator: PaginationType<T>;
    className?: string;
};

export default function Paginator<T>({ paginator, className }: Props<T>) {
    return (
        paginator.total > 1 && (
            <Pagination className={className}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={paginator.prev_page_url ?? ""}
                        />
                    </PaginationItem>

                    {paginator.links.slice(1, -1).map((link) => (
                        <PaginationItem key={link.label}>
                            <PaginationLink href={link.url ?? ""}>
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext href={paginator.next_page_url ?? ""} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    );
}
