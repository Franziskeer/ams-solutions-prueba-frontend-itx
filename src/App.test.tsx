import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.tsx";

vi.mock("./api/client.ts", () => ({
  getProducts: vi.fn(() => Promise.resolve([])),
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the shared header chrome on the product list", async () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Inditex, ir al listado de productos" }).getAttribute("href")).toBe("/");
    expect(screen.getByText("Artículos en la cesta: 0")).toBeTruthy();
    expect(await screen.findByText("No hay productos.")).toBeTruthy();
  });
});
