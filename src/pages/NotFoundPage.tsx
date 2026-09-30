import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="grid gap-4">
      <p className="text-ink">La página que buscas no existe.</p>
      <Link
        to="/"
        className="text-sm text-muted uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Volver al listado
      </Link>
    </div>
  );
}
