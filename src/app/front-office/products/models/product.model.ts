import { Category } from "src/app/layouts/vitrine/models/category.model";
import { Attachement } from "./attachement.model";

export class Product {
    id: number | undefined;
    libelle: string | undefined;
    price: number | undefined;
    currency: string | undefined;
    description: string | undefined;
    tag: string | undefined;
    imageName: string | undefined;
    productCategory: Category = new Category();
}