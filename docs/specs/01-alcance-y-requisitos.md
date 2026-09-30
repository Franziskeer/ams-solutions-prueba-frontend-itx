# Alcance y requisitos

Miniaplicación para comprar dispositivos móviles. Tiene únicamente dos vistas:

1. Vista principal: listado de productos.
2. Detalles del producto.

## Diseño

La implementación visual queda a libre elección. Debe seguir la estructura definida en las capturas de [vistas](./02-vistas.md). Se valora positivamente el nivel de detalle de la propuesta.

## Stack

- React o Preact. Se puede complementar con otras librerías JavaScript.
- Se permite JavaScript con ES6.
- Se puede usar un boilerplate para la estructura del proyecto.
- La aplicación es una SPA: el enrutado vive en el cliente. No es una MPA y no usa SSR.

## Scripts

El proyecto debe exponer estos scripts:

| Script | Uso |
| --- | --- |
| `start` | Modo desarrollo |
| `build` | Compilación para producción |
| `test` | Lanzamiento de tests |
| `lint` | Comprobación de código |

## Entrega

- Repositorio de código abierto (GitHub, GitLab o Bitbucket).
- El código se sube de forma evolutiva, alcanzando hitos.
- README en el repositorio, preferiblemente en el primer commit, con:
  - cómo ejecutar el proyecto;
  - notas o información adicional que se considere necesaria.
