import { getCart, calculateTotal, removeFromCart, updateQuantity } from './cartManager';

const contenedor = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total-carrito');
const btnVaciar = document.getElementById('btn-vaciar');

const renderizarCarrito = () => {
    const cart = getCart();

    if (cart.length === 0) {
        contenedor!.innerHTML = "<p>El carrito está vacío.</p>";
        totalElemento!.innerText = "Total: $0";
        return;
    }

    contenedor!.innerHTML = cart.map(item => `
        <div class="item-carrito" data-id="${item.id}">
            <span>${item.nombre}</span>
            <div class="controles-cantidad">
                <button class="btn-decrementar" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="btn-incrementar" data-id="${item.id}">+</button>
            </div>
            <span>Subtotal: $${item.precio * item.quantity}</span>
            <button class="btn-eliminar" data-id="${item.id}">🗑 Eliminar</button>
        </div>
    `).join('');

    totalElemento!.innerText = `Total: $${calculateTotal(cart)}`;

    contenedor!.querySelectorAll('.btn-incrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.target as HTMLElement).getAttribute('data-id'));
            const cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                updateQuantity(id, item.quantity + 1);
                renderizarCarrito();
            }
        });
    });

    contenedor!.querySelectorAll('.btn-decrementar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.target as HTMLElement).getAttribute('data-id'));
            const cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                updateQuantity(id, item.quantity - 1);
                renderizarCarrito();
            }
        });
    });

    contenedor!.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.target as HTMLElement).getAttribute('data-id'));
            removeFromCart(id);
            renderizarCarrito();
        });
    });
};

btnVaciar?.addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderizarCarrito();
});

renderizarCarrito();