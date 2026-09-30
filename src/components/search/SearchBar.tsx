import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <search className="w-full">
      <form
        className="relative"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="product-search" className="sr-only">
          Buscar por marca o modelo
        </label>
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
        <input
          id="product-search"
          type="search"
          value={value}
          placeholder="Marca o modelo"
          autoComplete="off"
          onChange={(event) => {
            onChange(event.target.value);
          }}
          className="h-11 w-full rounded-xl bg-surface pr-10 pl-10 text-sm text-ink shadow-sm placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value !== "" ? (
          <button
            type="button"
            aria-label="Borrar búsqueda"
            className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center text-muted hover:bg-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            onClick={() => {
              onChange("");
            }}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </form>
    </search>
  );
}
