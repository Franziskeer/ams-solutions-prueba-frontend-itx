import type { ProductDetail, ProductListItem } from "../domain/product.ts";
import type { ProductDetailDto, ProductListItemDto } from "./schemas.ts";

function toPrice(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

function toCameraList(value: string | string[]): string[] {
  const items = typeof value === "string" ? [value] : value;
  return items.map((item) => item.trim()).filter((item) => item !== "");
}

export function toProductListItem(dto: ProductListItemDto): ProductListItem {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    price: toPrice(dto.price),
    imageUrl: dto.imgUrl,
  };
}

export function toProductDetail(dto: ProductDetailDto): ProductDetail {
  return {
    ...toProductListItem(dto),
    cpu: dto.cpu,
    ram: dto.ram,
    operatingSystem: dto.os,
    screenResolution: dto.displaySize,
    battery: dto.battery,
    primaryCamera: toCameraList(dto.primaryCamera),
    secondaryCamera: toCameraList(dto.secondaryCmera),
    dimensions: dto.dimentions,
    weight: dto.weight,
    options: dto.options,
  };
}
