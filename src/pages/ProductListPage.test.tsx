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
    expect(screen.getByRole("searchbox", { name: "Buscar por marca o modelo" })).toBeTruthy();
  });

  it("filters the list as the query changes and restores it from the url", async () => {
    vi.mocked(getProducts).mockResolvedValue(products);

    render(
      <MemoryRouter initialEntries={["/?q=alcatel"]}>
        <ProductListPage />
      </MemoryRouter>,
    );

    const search = await screen.findByRole("searchbox", { name: "Buscar por marca o modelo" });
    expect((search as HTMLInputElement).value).toBe("alcatel");
    expect(screen.queryByRole("link", { name: /Iconia Talk S/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Flash/ })).toBeTruthy();

    fireEvent.change(search, { target: { value: "inexistente" } });
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByRole("status").textContent).toContain("Sin resultados");
    expect(screen.getByRole("status").textContent).toContain("Ningún producto coincide con «inexistente»");

    fireEvent.click(screen.getByRole("button", { name: "Borrar búsqueda" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect((search as HTMLInputElement).value).toBe("");
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
