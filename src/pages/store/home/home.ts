// src/pages/store/home/home.ts
import { PRODUCTS, getCategories } from '../../../data/data';
import { addToCart } from '../cart/cartManager.ts';

const contenedorProductos = document.getElementById('contenedor-productos') as HTMLElement;
const inputBusqueda = document.getElementById('input-busqueda') as HTMLInputElement;
const contenedorCategorias = document.getElementById('categorias-contenedor') as HTMLElement;
const btnLimpiar = document.getElementById('btn-limpiar') as HTMLButtonElement;

let filtroBusqueda = "";
let categoriaSeleccionada = "todos";

const renderizarProductos = () => {
    const productosFiltrados = PRODUCTS.filter(prod => {
        const coincideNombre = prod.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase());
        const coincideCategoria = categoriaSeleccionada === "todos" || 
            prod.categorias.some(cat => cat.nombre === categoriaSeleccionada);
        return coincideNombre && coincideCategoria && !prod.eliminado;
    });

    if (contenedorProductos) {
        if (productosFiltrados.length === 0) {
            contenedorProductos.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        contenedorProductos.innerHTML = productosFiltrados.map(prod => `
            <div class="card-producto">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <div class="info-precio">
                    <span style="font-weight: bold; color: var(--color-primario); display: block; margin-bottom: 10px;">
                        $${prod.precio}
                    </span>
                    <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
                </div>
            </div>
        `).join('');
    }
};

const cargarCategorias = () => {
    const categorias = getCategories();
    if (contenedorCategorias) {
        contenedorCategorias.innerHTML = `
            <button class="btn-filtro activo" data-cat="todos">Todos</button>
            ${categorias.map(cat => `
                <button class="btn-filtro" data-cat="${cat.nombre}">${cat.nombre}</button>
            `).join('')}
        `;

        contenedorCategorias.querySelectorAll('.btn-filtro').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                contenedorCategorias.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
                target.classList.add('activo');
                categoriaSeleccionada = target.getAttribute('data-cat') || "todos";
                renderizarProductos();
            });
        });
    }
};

inputBusqueda?.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    filtroBusqueda = target.value;
    renderizarProductos();
});

btnLimpiar?.addEventListener('click', () => {
    inputBusqueda.value = "";
    filtroBusqueda = "";
    renderizarProductos();
});

contenedorProductos?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-agregar')) {
        const id = Number(target.getAttribute('data-id'));
        const producto = PRODUCTS.find(p => p.id === id);
        if (producto) {
            addToCart(producto);
        }
    }
});

cargarCategorias();
renderizarProductos();