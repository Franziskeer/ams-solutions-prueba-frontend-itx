import { Link } from "react-router";
import type { ProductListItem } from "../../domain/product.ts";
import { formatPrice } from "./formatPrice.ts";

type ProductItemProps = {
  product: ProductListItem;
};

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to={`/product/${product.id}`} className="group space-y-4">
      <div className="overflow-hidden rounded-xl bg-surface p-4 shadow-sm">
        <img
          src={product.imageUrl}
          alt={product.model}
          className="mx-auto aspect-3/4 w-1/2 object-cover motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="grid grid-cols-[1fr_auto] grid-rows-2 items-center">
        <p className="text-xs text-muted uppercase row-span-1">{product.brand}</p>
        <p className={product.price === null ? "text-xs text-muted row-span-2" : "text-2xl font-bold row-span-2"}>{formatPrice(product.price)}</p>
        <p className="font-medium text-xs row-span-1">{product.model}</p>
      </div>
    </Link>
  );
}
