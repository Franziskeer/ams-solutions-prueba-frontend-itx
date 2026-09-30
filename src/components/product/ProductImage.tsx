type ProductImageProps = {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="self-start rounded-xl bg-surface p-6 shadow-sm">
      <img src={src} alt={alt} className="mx-auto aspect-3/4 w-1/2 max-w-60 object-contain" />
    </div>
  );
}
