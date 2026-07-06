# dragonglass

Framework de CSS puro, con HTML5 como punto de partida, orientado a construir interfaces rápido con HTML semántico, clases utilitarias, atributos declarativos y componentes predefinidos.

## Propósito

`dragonglass` reduce la fricción al crear UI sin depender de JavaScript para la capa visual. El proyecto usa Bun para ejecutar el build, compila SCSS a CSS distribuible y mantiene un sitio local de documentación y demos para revisar y probar componentes, utilidades y ejemplos de uso.

El repositorio produce dos salidas principales:

- Un paquete CSS distribuible en `dist/`.
- Un sitio estático de documentación generado en `docs/`.

## Enfoque de diseño

El framework se apoya en estas decisiones:

- HTML5 como base de composición.
- CSS puro como producto publicable.
- Clases utilitarias para resolver ajustes comunes.
- Atributos declarativos para expresar variantes o estados desde el marcado.
- Componentes SCSS separados para mantener la fuente organizada.
- Variables centrales para tamaños, tipografía, bordes, colores primarios, colores secundarios y variantes.

## Estructura del repositorio

```txt
dragonglass/
├── build.ts
├── package.json
├── dist/
│   ├── dragonglass.css
│   └── dragonglass.min.css
├── docs/
├── site/
│   ├── server.ts
│   ├── public/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── scss/
│   │       ├── main.scss
│   │       └── components/
│   │           └── *.scss
│   └── src/
│       ├── index.ts
│       └── pages/
│           └── *_page.tsx
└── README.md
```

## Requisitos

- Bun.
- Dependencias instaladas con `bun install`.

## Instalación

Instala las dependencias del proyecto:

```sh
bun install
```

## Desarrollo local

Ejecuta el servidor local y el watcher de Sass:

```sh
bun run dev
```

Luego abre:

```txt
http://localhost:3004/dragonglass
```

También puedes ejecutar cada proceso por separado:

```sh
bun run dev:server
```

```sh
bun run dev:sass
```

## Build

Genera el CSS compilado, los archivos de distribución y la documentación estática:

```sh
bun run build
```

El build ejecuta `bun build.ts` y produce estos artefactos:

- `site/public/css/main.css`
- `dist/dragonglass.css`
- `dist/dragonglass.min.css`
- `docs/`

El proyecto usa el runtime automático de TSX de Valyrian.js con `jsxImportSource: "valyrian.js"`. No uses la factory global `v` para compilar TSX.

## Cómo trabajar en componentes SCSS

La fuente principal del framework vive en:

```txt
site/public/scss/main.scss
```

Los componentes viven en:

```txt
site/public/scss/components/*.scss
```

Para agregar o modificar un componente:

1. Edita o crea el archivo SCSS del componente dentro de `site/public/scss/components/`.
2. Verifica que `main.scss` incluya ese componente si el build depende de una importación explícita.
3. Usa las variables base cuando necesites tamaños, tipografía, bordes, colores o variantes.
4. Ejecuta `bun run dev` durante el desarrollo para revisar los cambios en el sitio local.
5. Ejecuta `bun run build` antes de preparar una publicación o revisar los artefactos finales.

## Cómo trabajar en páginas de documentación

Las páginas de documentación y demo viven en:

```txt
site/src/pages/*_page.tsx
```

El sitio usa Valyrian.js y `Bun.serve` desde:

```txt
site/src/index.ts
site/server.ts
```

Para agregar o modificar documentación:

1. Edita la página correspondiente en `site/src/pages/`.
2. Mantén los ejemplos cerca del HTML real que esperas que use una persona desarrolladora.
3. Registra rutas nuevas en `site/src/index.ts` cuando agregues una página nueva.
4. Revisa el resultado con `bun run dev`.
5. Ejecuta `bun run build` para regenerar la versión estática en `docs/`.

## Publicación y release

El proyecto incluye scripts relacionados con publicación:

```sh
bun run release-test
```

```sh
bun run release
```

Úsalos con cautela. Antes de publicar conviene verificar al menos lo siguiente:

- El build termina correctamente.
- `dist/dragonglass.css` y `dist/dragonglass.min.css` existen y contienen la versión esperada.
- La documentación estática en `docs/` fue regenerada.
- Los metadatos de `package.json` apuntan a los archivos reales de distribución.
- La versión del paquete corresponde al cambio que se va a publicar.

## Estado actual y pendientes

Estado observado:

- El producto publicable se genera en `dist/dragonglass.css` y `dist/dragonglass.min.css`.
- La fuente real del framework está en `site/public/scss/main.scss` y `site/public/scss/components/*.scss`.
- El sistema base de tamaños, tipografía, bordes, colores primarios, colores secundarios y variantes vive en `site/public/scss/components/vars.scss`.
- El sitio de documentación y demo usa Valyrian.js y `Bun.serve`.
- No hay tests configurados.
- ESLint aparece en `devDependencies`, pero no hay una configuración activa.

Pendiente importante antes de publicar:

- El flujo de desarrollo usa Bun. Si agregas scripts nuevos, usa `bun run` para mantener una sola ruta operativa.

## Licencia

Este proyecto usa licencia Apache-2.0. Consulta `LICENSE` para el texto completo.
