import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Caminho da página" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[#475569]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link
                  className="font-semibold text-[#2563EB] transition hover:text-[#1D4ED8] focus:outline-none focus:ring-4 focus:ring-[#DBEAFE]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#475569]">{item.label}</span>
              )}
              {!isLast ? (
                <ChevronRight aria-hidden="true" size={16} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

