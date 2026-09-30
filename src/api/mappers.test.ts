import { describe, expect, it } from "vitest";
import { toProductDetail, toProductListItem } from "./mappers.ts";
import { productDetailSchema, productListItemSchema } from "./schemas.ts";

const listItem = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  brand: "Acer",
  model: "Iconia Talk S",
  price: "170",
  imgUrl: "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
  chipset: "ignored",
};

const detail = {
  ...listItem,
  os: "Android 6.0 (Marshmallow)",
  cpu: "Quad-core 1.3 GHz Cortex-A53",
  ram: "2 GB RAM",
  displaySize: "720 x 1280 pixels (~210 ppi pixel density)",
  displayResolution: "7.0 inches (~69.8% screen-to-body ratio)",
  battery: "Non-removable Li-Ion 3400 mAh battery (12.92 Wh)",
  primaryCamera: ["13 MP", "autofocus"],
  secondaryCmera: "8 MP",
  dimentions: "191.7 x 101 x 9.4 mm",
  weight: "260",
  options: {
    colors: [{ code: 1000, name: "Black" }],
    storages: [
      { code: 2000, name: "16 GB" },
      { code: 2001, name: "32 GB" },
    ],
  },
};

describe("catalog mappers", () => {
  it("maps a list item and drops fields the app does not use", () => {
    const product = toProductListItem(productListItemSchema.parse(listItem));

    expect(product).toEqual({
      id: "ZmGrkLRPXOTpxsU4jjAcv",
      brand: "Acer",
      model: "Iconia Talk S",
      price: 170,
      imageUrl: "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
    });
  });

  it("maps an empty price to null", () => {
    const product = toProductListItem(productListItemSchema.parse({ ...listItem, price: "" }));

    expect(product.price).toBeNull();
  });

  it("maps detail wire names onto the domain model", () => {
    const product = toProductDetail(productDetailSchema.parse(detail));

    expect(product).toMatchObject({
      price: 170,
      operatingSystem: "Android 6.0 (Marshmallow)",
      screenResolution: "720 x 1280 pixels (~210 ppi pixel density)",
      primaryCamera: ["13 MP", "autofocus"],
      secondaryCamera: ["8 MP"],
      dimensions: "191.7 x 101 x 9.4 mm",
      weight: "260",
      options: {
        colors: [{ code: 1000, name: "Black" }],
        storages: [
          { code: 2000, name: "16 GB" },
          { code: 2001, name: "32 GB" },
        ],
      },
    });
    expect(product).not.toHaveProperty("dimentions");
    expect(product).not.toHaveProperty("chipset");
  });

  it("rejects a detail payload that drops a field the app depends on", () => {
    const withoutDimensions: Record<string, unknown> = { ...detail };
    delete withoutDimensions.dimentions;

    expect(productDetailSchema.safeParse(withoutDimensions).success).toBe(false);
  });
});
