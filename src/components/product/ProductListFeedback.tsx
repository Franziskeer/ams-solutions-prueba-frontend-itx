import { LoaderCircle, SearchX, Smartphone } from "lucide-react";

const skeletonItems = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function ProductListSkeleton() {
  return (
    <div role="status" className="space-y-4 motion-safe:animate-fade-in">
      <p className="flex items-center gap-3 text-sm text-muted uppercase">
        <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
        Cargando productos…
      </p>
      <ul aria-hidden="true" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {skeletonItems.map((item) => (
          <li key={item} className="space-y-4">
            <div className="rounded-xl bg-surface p-4 shadow-sm">
              <div className="mx-auto aspect-3/4 w-1/2 motion-safe:animate-pulse bg-neutral-200" />
            </div>
            <div className="grid grid-cols-[1fr_auto] grid-rows-2 items-center gap-y-2">
              <div className="h-3 w-16 motion-safe:animate-pulse bg-neutral-200" />
              <div className="row-span-2 h-6 w-14 motion-safe:animate-pulse bg-neutral-200" />
              <div className="h-3 w-28 motion-safe:animate-pulse bg-neutral-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ProductListEmptyProps = {
  query: string;
};

export function ProductListEmpty({ query }: ProductListEmptyProps) {
  const trimmedQuery = query.trim();
  const isSearch = trimmedQuery !== "";

  return (
    <div
      role="status"
      className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl bg-surface px-6 py-16 text-center shadow-sm motion-safe:animate-fade-in"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-hover text-ink">
        {isSearch ? <SearchX aria-hidden="true" className="size-6" /> : <Smartphone aria-hidden="true" className="size-6" />}
      </span>
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase">{isSearch ? "Sin resultados" : "Sin productos"}</p>
        <p className="text-sm text-muted">
          {isSearch ? (
            <>
              Ningún producto coincide con <span className="text-ink">«{trimmedQuery}»</span>.
            </>
          ) : (
            "No hay productos."
          )}
        </p>
      </div>
    </div>
  );
}
