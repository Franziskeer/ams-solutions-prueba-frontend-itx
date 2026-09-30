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

## Decisiones

- **Contador de la cesta:** La cabecera muestra el `count` que devuelve `POST /api/cart`, tal y como indica el enunciado, y se persiste en cliente. El API de la prueba no guarda la cesta y siempre responde `{ "count": 1 }`, así que el contador se queda en 1 aunque se añadan varios productos. No se suma en cliente para no contar de más si el API devolviera el total real.
- **Migas de pan fuera de la cabecera:** El enunciado de la prueba técnica indica que hay que incluirlo en la cabecera, pero se ha decidido incluirla solamente en la página de detalle. Así cada vista decide su contenido y puede mostrar el nombre real del producto cuando llega del API, sin que la cabecera tenga que conocer los datos de la página. El enlace "Móviles" es el enlace que te devuelve al listado de productos.
- **Validación de las respuestas del API con zod:** Como no tengo control sobre los contratos del API y contiene erratas (`dimentions`, `secondaryCmera`) y tipos inconsistentes, `src/api` actúa como capa anticorrupción entre el API y la aplicación:
  - _Validación:_ `src/api/schemas.ts` valida con zod los campos que se usan. Si el API cambia, el error salta ahí y la vista muestra "Reintentar" en lugar de romperse en un componente.
  - _Adaptadores:_ `src/api/mappers.ts` convierte la respuesta en el modelo propio de `src/domain`, con nombres corregidos y valores normalizados. Los componentes solo conocen ese modelo, y un cambio del API se resuelve en un único sitio.
- **Datos irregulares del API:**
  - _Precio vacío:_ algunos productos llegan con `price: ""`. Se convierte a `null` y se muestra "No disponible" en lugar de 0 €, para no anunciar un precio que no existe.
  - _Resolución de pantalla:_ el API intercambia los campos. `displayResolution` trae el tamaño en pulgadas y `displaySize` la resolución en píxeles, que es lo que pide el enunciado, así que se usa `displaySize` para mostrar el valor en su lugar.
  - _Campos partidos por comas:_ el API convierte en array los textos que contienen comas, como el `cpu` de Alcatel Flash (2017). Los campos de texto aceptan string o array, y el mapper vuelve a unir el array con ", " para recuperar el texto original.
- **Caché:** Se guarda la respuesta cruda del API en `localStorage` junto a la fecha en que se recibió, y caduca a la hora. Se eligió `localStorage` para que la caché sobreviva a recargas y a pestañas nuevas, cosa que no conseguiría una caché en memoria. Al leerla se vuelve a validar con el esquema, de modo que una entrada caducada, corrupta o de una versión anterior se descarta y se pide de nuevo. Si el navegador no deja escribir, por cuota o modo privado, la aplicación sigue funcionando sin caché.
- **Búsqueda guardada en la URL:** El texto de búsqueda vive en `?q=` y no en el estado del componente. Al volver del detalle, con el navegador o con la miga de pan, se mantienen los mismos resultados, y la búsqueda se puede recargar o compartir. Cada pulsación reemplaza la entrada del historial para no llenarlo.
- **Criterio de filtrado:** El filtro no distingue mayúsculas ni tildes, ignora los espacios sobrantes y busca en la marca, en el modelo y en ambos juntos, de modo que "alcatel flash" encuentra resultados aunque ningún campo contenga el texto completo.
- **Sin librería de estado:** No se usa Redux ni Zustand porque apenas hay estado compartido. Los datos del API pertenecen a cada página y ya se cachean en `src/api`, y la búsqueda vive en la URL. Lo único compartido entre vistas es el contador de la cesta, que se guarda en `localStorage` y se notifica con un evento del navegador al que se suscribe la cabecera. Una librería añadiría una dependencia y más código sin resolver ningún problema. Si la cesta creciera, por ejemplo para listar los productos añadidos, se valoraría de nuevo.
- **Accesibilidad:** Se usa HTML semántico (`<search>`, `<dl>`, `fieldset` con `legend`, radios nativos en los selectores), foco visible en todos los elementos interactivos y textos para lectores de pantalla en el número de resultados y en el contador de la cesta. Los cambios de estado se anuncian con `role="status"` y `role="alert"`, y las animaciones se desactivan si el sistema pide reducir el movimiento.
- **Flujo de trabajo:** El código se ha subido por hitos, como pide el enunciado. Cada hito tiene una rama corta y uno o varios pull requests que se integran en `main` con rebase and merge para obtener un histórico de commits limpio en main. Se utiliza como convención Conventional Commits y en cada pull request, GitHub Actions ejecuta `lint`, `test` y `build` para detectar errores antes de cerrar el PR.
