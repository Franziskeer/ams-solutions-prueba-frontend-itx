const CART_COUNT_KEY = "cart-count";
export const CART_COUNT_CHANGE_EVENT = "cart-count-change";

export function getCartCount(): number {
  try {
    const value = localStorage.getItem(CART_COUNT_KEY);
    if (value === null) {
      return 0;
    }

    const count = Number(value);
    return Number.isFinite(count) && count >= 0 ? count : 0;
  } catch {
    return 0;
  }
}

export function setCartCount(count: number): void {
  const nextCount = Number.isFinite(count) && count >= 0 ? count : 0;

  try {
    localStorage.setItem(CART_COUNT_KEY, String(nextCount));
  } catch {
    // Ignore quota / private-mode failures; UI still updates in-memory listeners.
  }

  window.dispatchEvent(new CustomEvent(CART_COUNT_CHANGE_EVENT, { detail: { count: nextCount } }));
}
