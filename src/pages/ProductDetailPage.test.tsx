import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductDetail } from "../domain/product.ts";
import { ProductDetailPage } from "./ProductDetailPage.tsx";

vi.mock("../api/client.ts", () => ({
  getProduct: vi.fn(),
  addToCart: vi.fn(),
}));

import { addToCart, getProduct } from "../api/client.ts";

const product: ProductDetail = {
  id: "acer-1",
  brand: "Acer",
  model: "Iconia Talk S",
  price: 170,
  imageUrl: "https://example.test/acer.jpg",
  cpu: "Quad-core 1.3 GHz Cortex-A53",
  ram: "2 GB RAM",
  operatingSystem: "Android 6.0 (Marshmallow)",
  screenResolution: "720 x 1280 pixels",
  battery: "Non-removable Li-Ion 3400 mAh battery",
  primaryCamera: ["13 MP", "autofocus"],
  secondaryCamera: ["2 MP"],
  dimensions: "191.7 x 101 x 9.4 mm",
  weight: "260",
  options: {
    colors: [{ code: 1000, name: "Black" }],
    storages: [
      { code: 2000, name: "16 GB" },
      { code: 2001, name: "32 GB" },
    ],
  },
};

const singleOptionProduct: ProductDetail = {
  ...product,
  options: {
    colors: [{ code: 1000, name: "Black" }],
    storages: [{ code: 2000, name: "16 GB" }],
  },
};

function renderPage(entry: string | { pathname: string; state: unknown } = "/product/acer-1") {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProductDetailPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(getProduct).mockReset();
    vi.mocked(addToCart).mockReset();
  });

  it("renders the image and every field of the description", async () => {
    vi.mocked(getProduct).mockResolvedValue(product);

    renderPage();

    expect(await screen.findByRole("heading", { name: "Iconia Talk S" })).toBeTruthy();
    expect(getProduct).toHaveBeenCalledWith("acer-1");
    expect(screen.getByRole("img", { name: "Acer Iconia Talk S" }).getAttribute("src")).toBe("https://example.test/acer.jpg");

    const text = document.body.textContent ?? "";
    for (const value of [
      "Acer",
      "170",
      "Quad-core 1.3 GHz Cortex-A53",
      "2 GB RAM",
      "Android 6.0 (Marshmallow)",
      "720 x 1280 pixels",
      "Non-removable Li-Ion 3400 mAh battery",
      "13 MP, autofocus",
      "2 MP",
      "191.7 x 101 x 9.4 mm",
      "260 g",
    ]) {
      expect(text).toContain(value);
    }
  });

  it("preselects single options and enables the add button", async () => {
    vi.mocked(getProduct).mockResolvedValue(singleOptionProduct);

    renderPage();

    expect(((await screen.findByRole("radio", { name: "16 GB" })) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("radio", { name: "Black" }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole("button", { name: "Añadir" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("keeps the add button disabled until every option is chosen", async () => {
    vi.mocked(getProduct).mockResolvedValue(product);

    renderPage();

    const add = (await screen.findByRole("button", { name: "Añadir" })) as HTMLButtonElement;
    expect(add.disabled).toBe(true);

    fireEvent.click(screen.getByRole("radio", { name: "32 GB" }));
    expect(add.disabled).toBe(false);
  });

  it("adds the selected variant to the cart and stores the count", async () => {
    vi.mocked(getProduct).mockResolvedValue(product);
    vi.mocked(addToCart).mockResolvedValue(3);

    renderPage();

    fireEvent.click(await screen.findByRole("radio", { name: "32 GB" }));
    fireEvent.click(screen.getByRole("button", { name: "Añadir" }));

    expect(await screen.findByText("Añadido a la cesta")).toBeTruthy();
    expect(addToCart).toHaveBeenCalledWith({ id: "acer-1", colorCode: 1000, storageCode: 2001 });
    expect(localStorage.getItem("cart-count")).toBe("3");
  });

  it("shows an alert when the cart request fails", async () => {
    vi.mocked(getProduct).mockResolvedValue(singleOptionProduct);
    vi.mocked(addToCart).mockRejectedValue(new Error("offline"));

    renderPage();

    fireEvent.click(await screen.findByRole("button", { name: "Añadir" }));

    expect((await screen.findByRole("alert")).textContent).toBe("No se ha podido añadir el producto.");
    expect(localStorage.getItem("cart-count")).toBeNull();
  });

  it("links back to the list with the previous search", async () => {
    vi.mocked(getProduct).mockResolvedValue(product);

    renderPage({ pathname: "/product/acer-1", state: { listSearch: "?q=acer" } });

    await screen.findByRole("heading", { name: "Iconia Talk S" });
    expect(screen.getByRole("link", { name: "Móviles" }).getAttribute("href")).toBe("/?q=acer");
    expect(screen.getByText("Acer Iconia Talk S", { selector: "[aria-current='page']" })).toBeTruthy();
  });

  it("shows an error and retries the request", async () => {
    vi.mocked(getProduct).mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce(product);

    renderPage();

    expect((await screen.findByRole("link", { name: "Volver al listado" })).getAttribute("href")).toBe("/");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(await screen.findByRole("heading", { name: "Iconia Talk S" })).toBeTruthy();
    expect(getProduct).toHaveBeenCalledTimes(2);
  });
});
