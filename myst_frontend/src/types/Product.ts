import type { ProductImage } from "./ProductImage";

/* 
A Product represents an item that can be purchased in the store.
It includes details such as the product's ID, name, description, price, and associated images.

@author IFD
*/
export interface Product {
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number;
  product_images: ProductImage[];
}
