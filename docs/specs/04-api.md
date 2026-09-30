# Integración API

El dominio es el mismo para todos los endpoints:

```text
https://itx-frontend-test.onrender.com/
```

## Obtener el listado de productos

Alimenta la [PLP](./02-vistas.md#plp--product-list-page). Hay que mostrar todos los elementos devueltos.

```http
GET /api/product
```

Respuesta (ejemplo abreviado en el enunciado):

```js
[
  {
    id: 0001,
    ...
  },
  {
    id: 0002,
    ...
  }
]
```

## Obtener el detalle de producto

Alimenta la [PDP](./02-vistas.md#pdp--product-details-page).

```http
GET /api/product/:id
```

Respuesta (ejemplo abreviado en el enunciado):

```js
{
  id: 0001,
  ...
}
```

Los atributos mínimos que la interfaz debe mostrar a partir de este detalle están en [Descripción producto](./03-componentes.md#descripción-producto-description). Los selectores de color y almacenamiento están en [Acciones](./03-componentes.md#acciones-producto-actions).

## Añadir producto a la cesta

```http
POST /api/cart
```

Cuerpo:

```js
{
  id: 0001,
  colorCode: 1,
  storageCode: 2
}
```

| Campo | Origen |
| --- | --- |
| `id` | Identificador del producto |
| `colorCode` | Código del color seleccionado |
| `storageCode` | Código de la capacidad de almacenamiento seleccionada |

Respuesta:

```js
{
  count: 1
}
```

`count` es el número de productos en la cesta. Debe mostrarse en la cabecera de cualquier vista y persistirse en cliente.
