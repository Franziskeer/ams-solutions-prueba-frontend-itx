# Persistencia y caché

Hay que almacenar en cliente los datos que lleguen del API, para no repetir la misma petición en cada visita.

- Se guarda la información cada vez que se solicita al API.
- Cada entrada caduca a la **1 hora**. Pasado ese tiempo, hay que revalidarla.
- El almacenamiento puede ser del navegador o en memoria, siempre en cliente.

El contador de la cesta (`count`) también debe persistirse, porque la cabecera lo muestra en cualquier vista después de añadir un producto.
