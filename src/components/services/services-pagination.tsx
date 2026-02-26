'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ServicesPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ServicesPagination({ page, totalPages, onPageChange }: ServicesPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: Array<number | "ellipsis-left" | "ellipsis-right"> = [];
  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, page + 1);

  pages.push(1);
  if (start > 2) pages.push("ellipsis-left");
  for (let current = start; current <= end; current += 1) {
    if (current !== 1 && current !== totalPages) pages.push(current);
  }
  if (end < totalPages - 1) pages.push("ellipsis-right");
  if (totalPages > 1) pages.push(totalPages);

  return (
    <Pagination className="justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </PaginationItem>

        {pages.map((entry, idx) => {
          if (entry === "ellipsis-left" || entry === "ellipsis-right") {
            return (
              <PaginationItem key={`${entry}-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={entry}>
              <PaginationLink
                href="#"
                isActive={entry === page}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(entry);
                }}
              >
                {entry}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
