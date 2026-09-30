import { Link, useLocation } from "react-router";
import { CartButton } from "../cart";
import { Breadcrumb, type BreadcrumbItem } from "../ui/Breadcrumb.tsx";

function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  if (pathname.startsWith("/product/")) {
    return [{ label: "Móviles", to: "/" }, { label: "Nombre del producto" }];
  }

  return [];
}

export function Header() {
  const { pathname } = useLocation();
  const breadcrumbItems = getBreadcrumbItems(pathname);

  return (
    <>
      <header className="shadow-sm bg-surface">
        <div className="container mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <img src="/logo.svg" alt="Company Logo" className="h-6" />
            </Link>

            <CartButton />
          </div>
        </div>
      </header>

      {breadcrumbItems.length > 0 && (
        <div className="container mx-auto p-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}
    </>
  );
}
