import { Link } from "react-router";
import { CartCount } from "../cart";

export function Header() {
  return (
    <header className="shadow-sm bg-surface">
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
            <img src="/logo.svg" alt="Inditex, ir al listado de productos" className="h-6" />
          </Link>

          <CartCount />
        </div>
      </div>
    </header>
  );
}
