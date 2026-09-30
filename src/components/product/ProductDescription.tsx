import type { ProductDetail } from "../../domain/product.ts";
import { formatPrice } from "./formatPrice.ts";

type ProductDescriptionProps = {
  product: ProductDetail;
};

function orUnavailable(value: string): string {
  const trimmed = value.trim();
  return trimmed === "" ? "No disponible" : trimmed;
}

function formatList(values: string[]): string {
  return orUnavailable(values.join(", "));
}

function formatWeight(weight: string): string {
  const trimmed = weight.trim();
  return /^\d+(\.\d+)?$/.test(trimmed) ? `${trimmed} g` : orUnavailable(trimmed);
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const specs = [
    { label: "CPU", value: orUnavailable(product.cpu) },
    { label: "RAM", value: orUnavailable(product.ram) },
    { label: "Sistema operativo", value: orUnavailable(product.operatingSystem) },
    { label: "Resolución de pantalla", value: orUnavailable(product.screenResolution) },
    { label: "Batería", value: orUnavailable(product.battery) },
    { label: "Cámara principal", value: formatList(product.primaryCamera) },
    { label: "Cámara secundaria", value: formatList(product.secondaryCamera) },
    { label: "Dimensiones", value: orUnavailable(product.dimensions) },
    { label: "Peso", value: formatWeight(product.weight) },
  ];

  return (
    <section aria-labelledby="product-title" className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs text-muted uppercase">{product.brand}</p>
        <h1 id="product-title" className="text-2xl font-medium">
          {product.model}
        </h1>
        <p className={product.price === null ? "text-sm text-muted" : "text-3xl font-bold"}>{formatPrice(product.price)}</p>
      </div>
      <dl className="divide-y divide-line border-y border-line text-sm">
        {specs.map((spec) => (
          <div key={spec.label} className="grid gap-1 py-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-muted uppercase text-xs sm:self-center">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
