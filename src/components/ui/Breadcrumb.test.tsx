import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb.tsx";

describe("Breadcrumb", () => {
  it("renders nothing when there are no items", () => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumb items={[]} />
      </MemoryRouter>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("renders the current page without a link", () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: "Listado" }]} />
      </MemoryRouter>,
    );

    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Listado").getAttribute("aria-current")).toBe("page");
  });

  it("renders previous items as links and the last as current", () => {
    render(
      <MemoryRouter>
        <Breadcrumb items={[{ label: "Móviles", to: "/" }, { label: "Detalle" }]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Móviles" }).getAttribute("href")).toBe("/");
    expect(screen.getByText("Detalle").getAttribute("aria-current")).toBe("page");
  });
});
