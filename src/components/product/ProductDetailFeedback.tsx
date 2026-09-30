import { LoaderCircle } from "lucide-react";

const specRows = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

export function ProductDetailSkeleton() {
  return (
    <div role="status" className="space-y-4 motion-safe:animate-fade-in">
      <p className="flex items-center gap-3 text-sm text-muted uppercase">
        <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
        Cargando producto…
      </p>
      <div aria-hidden="true" className="grid gap-8 md:grid-cols-2">
        <div className="self-start rounded-xl bg-surface p-6 shadow-sm">
          <div className="mx-auto aspect-3/4 w-1/2 max-w-60 motion-safe:animate-pulse bg-neutral-200" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-3 w-16 motion-safe:animate-pulse bg-neutral-200" />
            <div className="h-7 w-48 motion-safe:animate-pulse bg-neutral-200" />
            <div className="h-9 w-24 motion-safe:animate-pulse bg-neutral-200" />
          </div>
          <div className="space-y-3">
            {specRows.map((row) => (
              <div key={row} className="h-4 w-full motion-safe:animate-pulse bg-neutral-200" />
            ))}
          </div>
          <div className="h-12 w-full motion-safe:animate-pulse bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
