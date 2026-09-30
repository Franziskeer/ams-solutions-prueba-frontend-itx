# AGENTS.md

Prueba técnica: SPA para comprar dispositivos móviles. El enunciado está en `docs` y el análisis en `docs/specs`. El README explica cómo ejecutar el proyecto.

## Comandos

Usa solo los scripts del `package.json`:

- `npm start` - desarrollo
- `npm test` - Vitest (`vitest run`)
- `npm run lint` - ESLint
- `npm run build` - producción
- `npm run preview` - servir la build

## Aplicación

- React, TypeScript y Vite. El `target` es `es2023`; el enunciado permite ES6 y no hay que bajarlo.
- Enrutado en cliente con React Router para una SPA: `/` es el listado y `/product/:id` es el detalle.
- API: `https://itx-frontend-test.onrender.com/`.

## Git

- `main` es la rama troncal. Una rama corta por hito: `chore/...` o `feat/...`.
- Un pull request por hito y rebase and merge a `main`.
- Conventional Commits en inglés, sin scope.
- La automatización de GitHub se limita a ejecutar `lint`, `test` y `build` en cada pull request.

## Tests

Los tests de componentes usan Testing Library. Vitest necesita `environment: 'jsdom'` en `vite.config.ts` porque `render` requiere un DOM y Node no lo tiene.

## Asistencia al programador

No desarrolles código ni hagas modificaciones a no ser que se solicite expresamente o mediante un plan de desarrollo. Asiste investigando recursos externos, analizando las propuestas y apoyándote en el código y los requerimientos generados. Puedes ejecutar los scripts del `package.json` si es necesario para diagnosticar bugs o si se solicita.