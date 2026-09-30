# Componentes

## Cabecera (HEADER)

Presente en todas las vistas.

- El título o el icono de la aplicación enlaza a la vista principal.
- Muestra un breadcrumb con la página actual y un enlace para navegar.
- A la derecha muestra el número de ítems añadidos al carrito.

El contador sale de la respuesta de [añadir al carrito](./04-api.md#añadir-producto-a-la-cesta) y debe persistirse para verse en cualquier vista. Ver [caché](./05-cache.md).

## Barra de búsqueda (SEARCH)

Visible en el listado.

- Input de texto libre.
- Filtra productos comparando el texto con la marca y el modelo.
- El filtrado es en tiempo real: se lanza una búsqueda cada vez que cambian los criterios.

## Elemento lista (ITEM)

Cada producto del listado muestra:

- Imagen
- Marca
- Modelo
- Precio

Seleccionar el elemento navega al detalle de ese producto.

## Imagen producto (IMAGE)

Muestra la imagen del producto en la columna izquierda del detalle.

## Descripción producto (DESCRIPTION)

Muestra los detalles del producto. Como mínimo:

- Marca
- Modelo
- Precio
- CPU
- RAM
- Sistema operativo
- Resolución de pantalla
- Batería
- Cámaras
- Dimensiones
- Peso

## Acciones producto (ACTIONS)

Dos selectores para elegir la variante que se añade a la cesta:

- Almacenamiento
- Colores

Si solo hay una opción, el selector se muestra igualmente y queda seleccionado por defecto.

Un botón **Añadir** envía el producto a la cesta con las opciones seleccionadas. El cuerpo de la petición incluye:

- identificador del producto;
- código de color seleccionado;
- código de la capacidad de almacenamiento seleccionada.

La respuesta devuelve el número de productos de la cesta. Ese valor se muestra en la cabecera en cualquier vista, así que hay que persistirlo.
