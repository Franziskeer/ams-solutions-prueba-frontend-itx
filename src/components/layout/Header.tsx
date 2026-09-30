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
    <header className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Company Logo" className="h-6" />
        </Link>

        <CartButton />
      </div>

      <Breadcrumb items={breadcrumbItems} />
    </header>
  );
}
