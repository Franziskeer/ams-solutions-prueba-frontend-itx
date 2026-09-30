import { beforeEach, describe, expect, it, vi } from "vitest";
import { CART_COUNT_CHANGE_EVENT, getCartCount, setCartCount } from "./cartStorage.ts";

describe("cartStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns 0 when no count is stored", () => {
    expect(getCartCount()).toBe(0);
  });

  it("persists and reads a valid count", () => {
    setCartCount(3);
    expect(localStorage.getItem("cart-count")).toBe("3");
    expect(getCartCount()).toBe(3);
  });

  it("returns 0 for invalid stored values", () => {
    localStorage.setItem("cart-count", "abc");
    expect(getCartCount()).toBe(0);

    localStorage.setItem("cart-count", "-2");
    expect(getCartCount()).toBe(0);
  });

  it("normalizes invalid counts before saving", () => {
    setCartCount(Number.NaN);
    expect(getCartCount()).toBe(0);

    setCartCount(-5);
    expect(getCartCount()).toBe(0);
  });

  it("dispatches a change event with the next count", () => {
    const listener = vi.fn();
    window.addEventListener(CART_COUNT_CHANGE_EVENT, listener);

    setCartCount(2);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({ count: 2 });

    window.removeEventListener(CART_COUNT_CHANGE_EVENT, listener);
  });
});
