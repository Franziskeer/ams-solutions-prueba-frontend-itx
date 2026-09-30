import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getProducts } from "../api/client.ts";
import { ProductListEmpty, ProductListSkeleton } from "../components/product/ProductListFeedback.tsx";
import { ProductItem } from "../components/product/ProductItem.tsx";
import { filterProducts } from "../components/search/filterProducts.ts";
import { SearchBar } from "../components/search/SearchBar.tsx";
import type { ProductListItem } from "../domain/product.ts";

export function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [products, setProducts] = useState<ProductListItem[] | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  function updateQuery(nextQuery: string) {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);

        if (nextQuery === "") {
          next.delete("q");
        } else {
          next.set("q", nextQuery);
        }

        return next;
      },
      { replace: true },
    );
  }

  useEffect(() => {
    let active = true;

    getProducts()
      .then((nextProducts) => {
        if (active) {
          setProducts(nextProducts);
          setError(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  if (error) {
    return (
      <div className="grid gap-4">
        <p className="text-ink">No se han podido cargar los productos.</p>
        <button
          type="button"
          className="h-8 w-fit bg-ink px-3 text-sm text-canvas uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          onClick={() => {
            setError(false);
            setProducts(null);
            setReloadKey((key) => key + 1);
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products === null) {
    return <ProductListSkeleton />;
  }

  const visibleProducts = filterProducts(products, query);
  const statusMessage = visibleProducts.length === 1 ? "1 producto" : `${visibleProducts.length} productos`;

  return (
    <div className="space-y-4">
      <div className="grid gap-2 lg:grid-cols-[2fr_1fr] items-center">
        <SearchBar value={query} onChange={updateQuery} />
        <p className="text-sm text-muted uppercase lg:order-first">{visibleProducts.length} productos encontrados</p>
      </div>
      {visibleProducts.length > 0 ? (
        <>
          <p className="sr-only" role="status">
            {statusMessage}
          </p>
          <ul className="grid gap-8 motion-safe:animate-fade-in sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <li key={product.id}>
                <ProductItem product={product} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ProductListEmpty query={products.length === 0 ? "" : query} />
      )}
    </div>
  );
}
