import { Product } from "src/app/front-office/products/models/product.model";

export class CartResponse {
    id: number | undefined;
    quantity: number | undefined;
    product: Product = new Product();
    price: number | undefined;
    currency: string | undefined;
    url: string | undefined;
}