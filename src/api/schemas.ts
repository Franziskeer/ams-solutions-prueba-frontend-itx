import { z } from "zod";

// The API splits values on commas, so any text field may arrive as a list.
const textSchema = z.union([z.string(), z.array(z.string())]);

const productOptionSchema = z.object({
  code: z.number().int(),
  name: z.string(),
});

export const productListItemSchema = z.object({
  id: z.string().min(1),
  brand: z.string(),
  model: z.string(),
  price: z.string(),
  imgUrl: z.string(),
});

// Wire names stay as the API sends them, including the typos.
// Pixel resolution arrives in displaySize, not displayResolution.
export const productDetailSchema = productListItemSchema.extend({
  os: textSchema,
  cpu: textSchema,
  ram: textSchema,
  displaySize: textSchema,
  battery: textSchema,
  primaryCamera: textSchema,
  secondaryCmera: textSchema,
  dimentions: textSchema,
  weight: textSchema,
  options: z.object({
    colors: z.array(productOptionSchema).min(1),
    storages: z.array(productOptionSchema).min(1),
  }),
});

export const productListSchema = z.array(productListItemSchema);

export const cartCountSchema = z.object({
  count: z.number().int().nonnegative(),
});

export type ProductListItemDto = z.infer<typeof productListItemSchema>;
export type ProductDetailDto = z.infer<typeof productDetailSchema>;
