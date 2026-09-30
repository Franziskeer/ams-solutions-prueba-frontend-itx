import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { CART_COUNT_CHANGE_EVENT, getCartCount } from "./cartStorage.ts";

export function CartButton() {
  const [count, setCount] = useState(getCartCount);

  useEffect(() => {
    function syncFromStorage() {
      setCount(getCartCount());
    }

    function syncFromEvent(event: Event) {
      const customEvent = event as CustomEvent<{ count: number }>;
      const nextCount = customEvent.detail?.count;
      setCount(typeof nextCount === "number" && Number.isFinite(nextCount) ? nextCount : getCartCount());
    }

    window.addEventListener(CART_COUNT_CHANGE_EVENT, syncFromEvent);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener(CART_COUNT_CHANGE_EVENT, syncFromEvent);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={`Artículos en la cesta: ${count}`}
      className="relative inline-flex items-center justify-center rounded-md p-2 text-ink hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <ShoppingBasket aria-hidden="true" className="size-6" />
      <span className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-ink px-1 text-xs font-medium text-surface">{count}</span>
    </button>
  );
}
