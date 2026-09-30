import { LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { addToCart } from "../../api/client.ts";
import type { ProductDetail, ProductOption } from "../../domain/product.ts";
import { setCartCount } from "../cart";
import { OptionGroup } from "./OptionGroup.tsx";

type ProductActionsProps = {
  product: ProductDetail;
};

type SubmitState = "idle" | "pending" | "success" | "error";

function defaultCode(options: ProductOption[]): number | null {
  return options.length === 1 ? options[0].code : null;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { colors, storages } = product.options;
  const [storageCode, setStorageCode] = useState(() => defaultCode(storages));
  const [colorCode, setColorCode] = useState(() => defaultCode(colors));
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const isPending = submitState === "pending";
  const canSubmit = storageCode !== null && colorCode !== null && !isPending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (storageCode === null || colorCode === null) {
      return;
    }

    setSubmitState("pending");
    try {
      const count = await addToCart({ id: product.id, colorCode, storageCode });
      setCartCount(count);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  function select(update: (code: number) => void) {
    return (code: number) => {
      update(code);
      setSubmitState("idle");
    };
  }

  return (
    <form aria-label="Opciones de compra" className="space-y-6" onSubmit={handleSubmit}>
      <OptionGroup
        name="storage"
        legend="Almacenamiento"
        options={storages}
        value={storageCode}
        onChange={select(setStorageCode)}
        disabled={isPending}
      />
      <OptionGroup name="color" legend="Color" options={colors} value={colorCode} onChange={select(setColorCode)} disabled={isPending} />
      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 w-full items-center justify-center gap-2 bg-ink px-6 text-sm text-canvas uppercase hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:bg-faint"
      >
        {isPending ? (
          <>
            <LoaderCircle aria-hidden="true" className="size-4 motion-safe:animate-spin" />
            Añadiendo…
          </>
        ) : (
          "Añadir"
        )}
      </button>
      <div className="min-h-5 text-sm">
        <p role="status" className="text-muted">
          {submitState === "success" ? "Añadido a la cesta" : ""}
        </p>
        {submitState === "error" ? (
          <p role="alert" className="text-red-700">
            No se ha podido añadir el producto.
          </p>
        ) : null}
      </div>
    </form>
  );
}
