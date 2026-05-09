import type { ICategory } from "./category";

export interface Product {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    categorias: ICategory[]; 
    stock: number;
    disponible: boolean;
    eliminado: boolean;
    createdAt: string;
}

export interface CartItem extends Product {
    quantity: number;
}