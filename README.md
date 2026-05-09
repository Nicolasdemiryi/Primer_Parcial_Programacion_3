# 🍕 TPI Food Store - Sistema de Gestión de Pedidos/ E-commerce

## 🎓 Universidad Tecnológica Nacional (UTN)
**Materia:** Programación III  
**Alumno:** Nicolas Demiryi  
**Tecnologías:** TypeScript + Vite + CSS3 + HTML

---

## 📝 Descripción del Proyecto
Este proyecto consiste en una aplicación web robusta para la gestión de pedidos de una tienda de comidas. Se enfoca en la implementación de **TypeScript** para garantizar un tipado fuerte, el uso de **Vite** como empaquetador de alto rendimiento y una arquitectura modular basada en componentes y tipos de datos definidos.

## 🚀 Funcionalidades Principales

* **Sistema de Autenticación:** Login y Registro de usuarios con redirección basada en roles (Admin/Client).
* **Catálogo Dinámico:** Renderizado de productos desde una base de datos simulada en TS.
* **Filtros Avanzados:** * Buscador por nombre en tiempo real.
    * Filtrado por categorías (Pizzas, Hamburguesas, etc.) utilizando métodos de array (`filter`, `some`).
* **Gestión de Carrito:**
    * Adición de productos con persistencia en `localStorage`.
    * Cálculo dinámico de totales.
* **Arquitectura Escalable:** Uso de interfaces y tipos para estandarizar los datos del sistema.

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Herramienta de Construcción:** [Vite](https://vitejs.dev/)
* **Estilos:** CSS3 con variables personalizadas y diseño responsivo.
* **Persistencia:** LocalStorage Web API.

## 📂 Estructura del Proyecto

```text
src/
├── pages/            # Vistas principales (Login, Home, Cart, Admin)
├── types/            # Interfaces de TypeScript (IProduct, ICategory, etc.)
├── data/             # Base de datos simulada (data.ts)
├── utils/            # Funciones de ayuda (Validaciones, Auth)
└── main.ts           # Punto de entrada y lógica de ruteo
