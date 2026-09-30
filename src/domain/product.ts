export type ProductId = string;

export type ProductListItem = {
  id: ProductId;
  brand: string;
  model: string;
  price: number | null;
  imageUrl: string;
};

export type ProductOption = {
  code: number;
  name: string;
};

export type ProductDetail = ProductListItem & {
  cpu: string;
  ram: string;
  operatingSystem: string;
  screenResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCamera: string[];
  dimensions: string;
  weight: string;
  options: {
    colors: ProductOption[];
    storages: ProductOption[];
  };
};
