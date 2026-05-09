import type { Product, CartItem } from "../../../types/product"; 

export const getCart = (): CartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product): void => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Al usar CartItem aquí, la importación de arriba deja de estar en rojo
        const newItem: CartItem = { ...product, quantity: 1 };
        cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.nombre} se agregó al carrito`);
};

export const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
};