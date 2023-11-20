import { Product } from "./product.model";

export class Attachement {
    id: number | undefined;
    imageName: string | undefined;
    product: Product = new Product();
    url: string | undefined;
}