import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Migas de pan">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = !isLast ? item.to : undefined;

          return (
            <Fragment key={`${item.label}-${item.to ?? "current"}`}>
              {index > 0 ? (
                <li aria-hidden="true" className="flex items-center text-faint">
                  <ChevronRight className="size-4" />
                </li>
              ) : null}
              <li>
                {href != null ? (
                  <Link to={href} className="text-sm text-muted uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-sm text-ink uppercase">
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
