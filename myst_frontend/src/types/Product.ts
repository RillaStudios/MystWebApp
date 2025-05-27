import type { ProductImage } from "./ProductImage";

export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_images: ProductImage[];
}
