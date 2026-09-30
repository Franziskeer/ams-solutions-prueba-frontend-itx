import { describe, expect, it } from "vitest";
import type { ProductListItem } from "../../domain/product.ts";
import { filterProducts } from "./filterProducts.ts";

const products: ProductListItem[] = [
  {
    id: "acer-1",
    brand: "Acer",
    model: "Iconia Talk S",
    price: 170,
    imageUrl: "https://example.test/acer.jpg",
  },
  {
    id: "alcatel-1",
    brand: "Alcatel",
    model: "Flash",
    price: null,
    imageUrl: "https://example.test/alcatel.jpg",
  },
];

describe("filterProducts", () => {
  it("returns every product when the query is empty or blank", () => {
    expect(filterProducts(products, "")).toBe(products);
    expect(filterProducts(products, "   ")).toEqual(products);
  });

  it("matches brand or model regardless of case and accents", () => {
    expect(filterProducts(products, "acer").map((product) => product.id)).toEqual(["acer-1"]);
    expect(filterProducts(products, "ÍCONIA").map((product) => product.id)).toEqual(["acer-1"]);
    expect(filterProducts(products, "flash").map((product) => product.id)).toEqual(["alcatel-1"]);
  });

  it("matches a query that spans brand and model", () => {
    expect(filterProducts(products, "acer iconia").map((product) => product.id)).toEqual(["acer-1"]);
  });

  it("returns no products when nothing matches", () => {
    expect(filterProducts(products, "samsung")).toEqual([]);
  });
});
