import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { getProduct } from "../api/client.ts";
import { ProductActions } from "../components/product/ProductActions.tsx";
import { ProductDescription } from "../components/product/ProductDescription.tsx";
import { ProductDetailSkeleton } from "../components/product/ProductDetailFeedback.tsx";
import { ProductImage } from "../components/product/ProductImage.tsx";
import { Breadcrumb } from "../components/ui/Breadcrumb.tsx";
import type { ProductDetail } from "../domain/product.ts";

type LoadResult = { id: string; product: ProductDetail } | { id: string; error: true };

function getListHref(state: unknown): string {
  if (typeof state === "object" && state !== null && "listSearch" in state) {
    const { listSearch } = state;
    if (typeof listSearch === "string" && listSearch.startsWith("?")) {
      return `/${listSearch}`;
    }
  }

  return "/";
}

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const location = useLocation();
  const listHref = getListHref(location.state);
  const [result, setResult] = useState<LoadResult | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    getProduct(id)
      .then((product) => {
        if (active) {
          setResult({ id, product });
        }
      })
      .catch(() => {
        if (active) {
          setResult({ id, error: true });
        }
      });

    return () => {
      active = false;
    };
  }, [id, reloadKey]);

  const current = result?.id === id ? result : null;
  const product = current !== null && "product" in current ? current.product : null;
  const productName = product === null ? "Producto" : `${product.brand} ${product.model}`;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Móviles", to: listHref }, { label: productName }]} />

      {current === null ? (
        <ProductDetailSkeleton />
      ) : product === null ? (
        <div className="grid gap-4">
          <p className="text-ink">No se ha podido cargar el producto.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="h-8 w-fit bg-ink px-3 text-sm text-canvas uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              onClick={() => {
                setResult(null);
                setReloadKey((key) => key + 1);
              }}
            >
              Reintentar
            </button>
            <Link to={listHref} className="text-sm text-muted uppercase hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              Volver al listado
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 motion-safe:animate-fade-in lg:grid-cols-2">
          <ProductImage src={product.imageUrl} alt={productName} />
          <div className="space-y-8">
            <ProductDescription product={product} />
            <ProductActions key={product.id} product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
