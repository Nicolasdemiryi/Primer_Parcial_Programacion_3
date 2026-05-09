export interface ICategory {
    id: number;
    nombre: string;
    descripcion: string;
    eliminado: boolean;
    createdAt: string;
}
// Agregamos esto para forzar que sea un módulo
export {};