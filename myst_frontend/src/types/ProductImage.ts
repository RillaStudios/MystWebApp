/* 
A ProductImage represents an image associated with a product in the store.
It includes the URL of the image and its order in the sequence of images for that product.

@author IFD
*/
export interface ProductImage {
  image_url: string;
  order: number;
}