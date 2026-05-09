import { getCart, calculateTotal } from './cartManager';

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
        <div class="item-carrito">
            <span>${item.nombre}</span> - 
            <span>Cant: ${item.quantity}</span> - 
            <span>Subtotal: $${item.precio * item.quantity}</span>
        </div>
    `).join('');

    totalElemento!.innerText = `Total: $${calculateTotal(cart)}`;
};

btnVaciar?.addEventListener('click', () => {
    localStorage.removeItem('cart');
    renderizarCarrito();
});

renderizarCarrito();