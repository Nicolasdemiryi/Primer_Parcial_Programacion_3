// src/pages/store/home/home.ts
import { PRODUCTS, getCategories } from '../../../data/data';
import type { Product } from '../../../types/product';
import { addToCart } from '../cart/cartManager.ts';


// 1. Captura de elementos del DOM
const contenedorProductos = document.getElementById('contenedor-productos') as HTMLElement;
const inputBusqueda = document.getElementById('input-busqueda') as HTMLInputElement;
const contenedorCategorias = document.getElementById('categorias-contenedor') as HTMLElement;

let filtroBusqueda = "";
let categoriaSeleccionada = "todos";

// 2. Función de Renderizado
const renderizarProductos = () => {
    const productosFiltrados = PRODUCTS.filter(prod => {
        // Buscamos coincidencia en el nombre
        const coincideNombre = prod.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase());
        
        // Como en data.ts 'categorias' es un array, usamos .some() para comparar el nombre de la categoría
        const coincideCategoria = categoriaSeleccionada === "todos" || 
            prod.categorias.some(cat => cat.nombre === categoriaSeleccionada);
            
        return coincideNombre && coincideCategoria && !prod.eliminado;
    });

    if (contenedorProductos) {
        if (productosFiltrados.length === 0) {
            contenedorProductos.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        // Renderizado dinámico de tarjetas usando los datos filtrados
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

// 3. Lógica de Categorías
const cargarCategorias = () => {
    const categorias = getCategories();
    if (contenedorCategorias) {
        contenedorCategorias.innerHTML = `
            <button class="btn-filtro" data-cat="todos">Todos</button>
            ${categorias.map(cat => `
                <button class="btn-filtro" data-cat="${cat.nombre}">${cat.nombre}</button>
            `).join('')}
        `;

        contenedorCategorias.querySelectorAll('.btn-filtro').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                categoriaSeleccionada = target.getAttribute('data-cat') || "todos";
                renderizarProductos();
            });
        });
    }
};

// 4. Event Listeners
inputBusqueda?.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    filtroBusqueda = target.value;
    renderizarProductos();
});

// Delegación de eventos para los botones de agregar al carrito
contenedorProductos?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-agregar')) {
        const id = Number(target.getAttribute('data-id'));
        
        // Tipamos explícitamente como :Product para usar la importación y quitar el warning
        const producto: Product | undefined = PRODUCTS.find(p => p.id === id); 
        
        if (producto) {
            addToCart(producto);
        }
    }
});

// Ejecución inicial
cargarCategorias();
renderizarProductos();