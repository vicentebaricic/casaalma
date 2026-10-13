# Casa Alma · Tema Shopify (base Dawn 16.0.0)

Tema nuevo para Casa Alma (tienda 5addc8.myshopify.com · admin "almalife"). Se publica como **borrador (no activo)**.

## Publicar como draft
```bash
npm i -g @shopify/cli
cd shopify-theme
# Opción A (login interactivo en el navegador)
shopify theme push --store 5addc8.myshopify.com --unpublished --theme "Casa Alma 2026 (borrador)"
# Opción B (sin navegador): password de la app "Theme Access"
SHOPIFY_CLI_THEME_TOKEN=shptka_xxx shopify theme push --store 5addc8.myshopify.com --unpublished --theme "Casa Alma 2026 (borrador)"
```
`--unpublished` crea un tema nuevo sin tocar el tema en vivo.

## Qué trae
Secciones propias (todas editables en el editor visual, prefijo **CA ·**):

| Sección | Qué hace |
|---|---|
| CA · Portada | Hero con imagen, título, botón de reserva por WhatsApp |
| CA · Cinta de texto | Cinta animada con frases |
| CA · La experiencia | Texto + foto, pilares, tarjeta de precio |
| CA · Fechas | Grid de productos de una colección. Lee el **inventario** (cupos), muestra "Quedan X cupos" / "Sin cupos" y el botón abre WhatsApp con el nombre de la experiencia |
| CA · Eventos privados | Concepto, ceremonias, formatos, características y tarifas por temporada |
| CA · Anfitrión | Retrato + texto + equipo |
| CA · Galería | Fotos con lightbox |
| CA · Testimonios | Reseñas |
| CA · Ubicación | Dirección, contacto, mapa |
| CA · Ficha experiencia | Página de producto: afiche, precio, cupos, descripción, reserva por WhatsApp |

Ajustes globales en **Configuración del tema → Casa Alma**: número de WhatsApp, mensajes
pre-escritos (`{producto}` se reemplaza por el nombre), colores, ocultar carrito.

Plantillas: `index`, `product` (default) y `product.experiencia` usan la ficha con WhatsApp;
`collection` usa el grid de fechas. Si la tienda tiene productos con otra plantilla asignada
(p. ej. `product.xyz`), hay que crear `templates/product.xyz.json` con el mismo contenido.

Subtítulo de cada fecha (p. ej. el DJ): metacampo de producto `custom.artista` (opcional).
