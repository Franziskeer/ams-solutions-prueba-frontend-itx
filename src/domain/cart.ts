import type { ProductId } from "./product.ts";

export type AddToCartBody = {
  id: ProductId;
  colorCode: number;
  storageCode: number;
};
