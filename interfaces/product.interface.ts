import { Timestamp } from "firebase/firestore";
import { ItemsImage } from "./item-image.interface";

export interface Product {
    id?: string;
    image : ItemsImage;
    name : string ;
    price : number;
    soldUnits : number ;
    createdAt? : Timestamp ;
}

