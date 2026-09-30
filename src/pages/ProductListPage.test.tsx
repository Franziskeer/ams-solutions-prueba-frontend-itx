import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductListItem } from "../domain/product.ts";
import { ProductListPage } from "./ProductListPage.tsx";

vi.mock("../api/client.ts", () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from "../api/client.ts";

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
    brand: "alcatel",
    model: "Flash",
    price: null,
    imageUrl: "https://example.test/alcatel.jpg",
  },
];

describe("ProductListPage", () => {
  beforeEach(() => {
    vi.mocked(getProducts).mockReset();
  });

  it("renders products from the catalog and links to the detail", async () => {
    vi.mocked(getProducts).mockResolvedValue(products);

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>,
    );

    const iconia = await screen.findByRole("link", { name: /Iconia Talk S/ });
    expect(iconia.getAttribute("href")).toBe("/product/acer-1");
    expect(iconia.textContent).toContain("Acer");
    expect(iconia.textContent).toContain("170");

    expect(screen.getByRole("link", { name: /Flash/ }).textContent).toContain("No disponible");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows an error and retries the request", async () => {
    vi.mocked(getProducts).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(products);

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Reintentar" }));

    expect(await screen.findByRole("link", { name: /Iconia Talk S/ })).toBeTruthy();
    expect(getProducts).toHaveBeenCalledTimes(2);
  });
});
