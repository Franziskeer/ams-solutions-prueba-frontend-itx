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

function toText(value: string | string[]): string {
  return typeof value === "string" ? value : value.join(", ");
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
    cpu: toText(dto.cpu),
    ram: toText(dto.ram),
    operatingSystem: toText(dto.os),
    screenResolution: toText(dto.displaySize),
    battery: toText(dto.battery),
    primaryCamera: toCameraList(dto.primaryCamera),
    secondaryCamera: toCameraList(dto.secondaryCmera),
    dimensions: toText(dto.dimentions),
    weight: toText(dto.weight),
    options: dto.options,
  };
}
