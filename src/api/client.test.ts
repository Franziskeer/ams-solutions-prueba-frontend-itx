import { beforeEach, describe, expect, it, vi } from "vitest";
import { CATALOG_CACHE_TTL_MS } from "./cache.ts";
import { addToCart, getProduct, getProducts } from "./client.ts";

const listPayload = [
  {
    id: "ZmGrkLRPXOTpxsU4jjAcv",
    brand: "Acer",
    model: "Iconia Talk S",
    price: "170",
    imgUrl: "https://example.test/phone.jpg",
  },
];

const detailPayload = {
  ...listPayload[0],
  os: "Android 6.0",
  cpu: "Quad-core",
  ram: "2 GB RAM",
  displaySize: "720 x 1280 pixels",
  battery: "3400 mAh",
  primaryCamera: ["13 MP"],
  secondaryCmera: ["2 MP"],
  dimentions: "191.7 x 101 x 9.4 mm",
  weight: "260",
  options: {
    colors: [{ code: 1000, name: "Black" }],
    storages: [{ code: 2000, name: "16 GB" }],
  },
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

describe("catalog client", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(1_000);
  });

  it("fetches the list once and serves the next read from cache", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(listPayload));

    const first = await getProducts();
    const second = await getProducts();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
    expect(first[0]).toMatchObject({ id: "ZmGrkLRPXOTpxsU4jjAcv", price: 170 });
  });

  it("refetches the list after the cache expires", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(() => Promise.resolve(jsonResponse(listPayload)));

    await getProducts();
    vi.mocked(Date.now).mockReturnValue(1_000 + CATALOG_CACHE_TTL_MS);
    await getProducts();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("maps a cached detail without calling the network again", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse(detailPayload));

    const product = await getProduct("ZmGrkLRPXOTpxsU4jjAcv");
    await getProduct("ZmGrkLRPXOTpxsU4jjAcv");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("https://itx-frontend-test.onrender.com/api/product/ZmGrkLRPXOTpxsU4jjAcv");
    expect(product.dimensions).toBe("191.7 x 101 x 9.4 mm");
    expect(product.secondaryCamera).toEqual(["2 MP"]);
  });

  it("returns the cart count from the response", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse({ count: 4 }));

    const count = await addToCart({ id: "ZmGrkLRPXOTpxsU4jjAcv", colorCode: 1000, storageCode: 2000 });

    expect(count).toBe(4);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      method: "POST",
      body: JSON.stringify({ id: "ZmGrkLRPXOTpxsU4jjAcv", colorCode: 1000, storageCode: 2000 }),
    });
  });

  it("throws when the catalog responds with an error status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(jsonResponse({ message: "nope" }, 500));

    await expect(getProducts()).rejects.toThrow("Catalog request failed (500)");
  });
});
