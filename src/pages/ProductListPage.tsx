import { useEffect, useState } from "react";
import { getProducts } from "../api/client.ts";
import { ProductItem } from "../components/product/ProductItem.tsx";
import type { ProductListItem } from "../domain/product.ts";

export function ProductListPage() {
  const [products, setProducts] = useState<ProductListItem[] | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

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
    return (
      <p className="text-muted" role="status">
        Cargando productos…
      </p>
    );
  }

  if (products.length === 0) {
    return <p className="text-muted">No hay productos.</p>;
  }

  return (
    <ul className="grid gap-8 motion-safe:animate-fade-in sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ul>
  );
}
