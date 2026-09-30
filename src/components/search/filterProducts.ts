import type { ProductListItem } from "../../domain/product.ts";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("es")
    .trim()
    .replace(/\s+/g, " ");
}

export function filterProducts(products: ProductListItem[], query: string): ProductListItem[] {
  const normalizedQuery = normalize(query);

  if (normalizedQuery === "") {
    return products;
  }

  return products.filter((product) => {
    const brand = normalize(product.brand);
    const model = normalize(product.model);
    const fields = [brand, model, `${brand} ${model}`];

    return fields.some((field) => field.includes(normalizedQuery));
  });
}
