# AMS Solutions - Prueba técnica frontend

Aplicación para comprar dispositivos móviles. Tiene dos vistas: el listado de productos y el detalle de cada uno.

## Stack elegido

- **React y TypeScript:** React es el framework que pide la prueba, y TypeScript deja por escrito el contrato del API, en especial el identificador del producto y los códigos de color y almacenamiento.
- **Vite:** Sirve la aplicación en desarrollo y genera la build de producción con los scripts que exige el enunciado.
- **Vitest:** Ejecuta los tests en el mismo entorno de Vite, que es el script test obligatorio.
- **React Router:** Cambia entre el listado y el detalle en el cliente con el enrutado de SPA que pide la prueba.
- **Tailwind CSS y lucide-react:** Tailwind agiliza el desarrollo responsive de hasta cuatro productos por fila y lucide-react ofrece iconos limpios para una interfaz más intuitiva.
- **ESLint:** Cubre el script lint y aplica el mismo criterio en todo el código.

## Cómo ejecutarlo

Es necesario tener instalado Node.js. Este proyecto ha sido desarrollado usando las siguientes versiones:

```bash
$ npm -v
11.19.0
$ node -v
v24.20.0
```

Para lanzar el proyecto se deben utilizar los siguientes scripts:

```bash
npm install
npm start
npm run build
npm test
npm run lint
```

Para abrir en local el resultado de `build`:

```bash
npm run preview
```
