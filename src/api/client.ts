import type { AddToCartBody } from "../domain/cart.ts";
import type { ProductDetail, ProductListItem } from "../domain/product.ts";
import { readCachedPayload, removeCachedPayload, writeCachedPayload } from "./cache.ts";
import { toProductDetail, toProductListItem } from "./mappers.ts";
import { cartCountSchema, productDetailSchema, productListSchema } from "./schemas.ts";

const API_BASE_URL = "https://itx-frontend-test.onrender.com";
const PRODUCT_LIST_KEY = "product-list";

function productCacheKey(id: string): string {
  return `product:${id}`;
}

async function readJson(path: string, init?: RequestInit): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  if (!response.ok) {
    throw new Error(`Catalog request failed (${response.status})`);
  }

  const payload: unknown = await response.json();
  return payload;
}

function readProductList(payload: unknown | null): ProductListItem[] | null {
  if (payload === null) {
    return null;
  }

  const parsed = productListSchema.safeParse(payload);
  if (!parsed.success) {
    removeCachedPayload(PRODUCT_LIST_KEY);
    return null;
  }

  return parsed.data.map(toProductListItem);
}

function readProductDetail(id: string, payload: unknown | null): ProductDetail | null {
  if (payload === null) {
    return null;
  }

  const parsed = productDetailSchema.safeParse(payload);
  if (!parsed.success) {
    removeCachedPayload(productCacheKey(id));
    return null;
  }

  return toProductDetail(parsed.data);
}

export async function getProducts(): Promise<ProductListItem[]> {
  const cached = readProductList(readCachedPayload(PRODUCT_LIST_KEY));
  if (cached !== null) {
    return cached;
  }

  const payload = await readJson("/api/product");
  const products = productListSchema.parse(payload).map(toProductListItem);
  writeCachedPayload(PRODUCT_LIST_KEY, payload);
  return products;
}

export async function getProduct(id: string): Promise<ProductDetail> {
  const key = productCacheKey(id);
  const cached = readProductDetail(id, readCachedPayload(key));
  if (cached !== null) {
    return cached;
  }

  const payload = await readJson(`/api/product/${encodeURIComponent(id)}`);
  const product = toProductDetail(productDetailSchema.parse(payload));
  writeCachedPayload(key, payload);
  return product;
}

export async function addToCart(body: AddToCartBody): Promise<number> {
  const payload = await readJson("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return cartCountSchema.parse(payload).count;
}
