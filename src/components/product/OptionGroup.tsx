import type { ProductOption } from "../../domain/product.ts";

type OptionGroupProps = {
  name: string;
  legend: string;
  options: ProductOption[];
  value: number | null;
  onChange: (code: number) => void;
  disabled?: boolean;
};

export function OptionGroup({ name, legend, options, value, onChange, disabled = false }: OptionGroupProps) {
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="text-xs text-muted uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.code} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.code}
              checked={value === option.code}
              onChange={() => onChange(option.code)}
              className="peer sr-only"
            />
            <span className="inline-flex h-10 min-w-16 items-center justify-center border border-line bg-surface px-4 text-sm peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-hover:border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
              {option.name}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
