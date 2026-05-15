import type { Product, CartItem } from "../../../types/product"; 

export const getCart = (): CartItem[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const mostrarToast = (mensaje: string): void => {
    const toast = document.createElement('div');
    toast.innerText = mensaje;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
};

export const addToCart = (product: Product): void => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem: CartItem = { ...product, quantity: 1 };
        cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    mostrarToast(`✅ ${product.nombre} agregado al carrito`);
};

export const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
};

export const removeFromCart = (productId: number): void => {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
};

export const updateQuantity = (productId: number, cantidad: number): void => {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = cantidad;
        if (item.quantity <= 0) {
            localStorage.setItem('cart', JSON.stringify(cart.filter(i => i.id !== productId)));
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
};