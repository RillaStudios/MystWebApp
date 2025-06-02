/* 
A Review represents feedback provided by a customer about a product.
It includes details such as the reviewer's name, rating, review text, and the date the review was created.

@author IFD
*/
export interface Review {
    reviewer_name?: string;
    rating: number;
    review_text?: string;
    created_at?: Date;
}