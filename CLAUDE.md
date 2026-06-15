# CLAUDE.md — Jugando y Educando · Tema Impulse

> Este archivo es leído automáticamente por Claude Code al abrir el proyecto.
> Contiene todas las reglas, contexto y convenciones del proyecto.
> **No modificar sin consultar al responsable del proyecto.**

---

## Contexto del Proyecto

**Empresa:** Jugando y Educando  
**Tipo:** Ecommerce B2C colombiano de juguetería y material didáctico  
**Plataforma:** Shopify con tema **Impulse** (tema de pago)  
**Catálogo:** ~8.600 productos  
**Colecciones principales:** Categoría (tipo de producto) y Edad (rango etario)  
**PRD completo:** Ver `PRD.md` en este mismo directorio

---

## Paleta de Colores

Estas son las ÚNICAS variables de color autorizadas. No usar otros colores sin aprobación.

```
--color-primary:     #DF2703   /* Rojo — CTAs, botones, nav activa */
--color-background:  #FEFDF6   /* Crema — fondo base de la tienda */
--color-accent-1:    #F2D022   /* Amarillo — badges, destacados */
--color-accent-2:    #F29F05   /* Naranja — hover, descuentos, secundario */
--color-secondary:   #0B4FD9   /* Azul — links, trust badges, info */
--color-text:        #1A1A1A   /* Texto principal */
--color-text-light:  #4A4A4A   /* Texto secundario/subtítulos */
--color-white:       #FFFFFF   /* Solo para texto sobre fondos oscuros */
```

**Reglas de contraste — respetar siempre:**
- Rojo (#DF2703) sobre crema (#FEFDF6) ✅
- Rojo (#DF2703) sobre blanco (#FFFFFF) ✅
- Texto oscuro (#1A1A1A) sobre crema (#FEFDF6) ✅
- Blanco (#FFFFFF) sobre rojo (#DF2703) ✅
- Blanco (#FFFFFF) sobre azul (#0B4FD9) ✅
- ❌ NUNCA: rojo sobre naranja (contraste insuficiente)
- ❌ NUNCA: amarillo sobre crema (contraste insuficiente)
- ❌ NUNCA: usar blanco puro como fondo base — siempre usar crema

---

## Tipografía

**Decisión confirmada:**

```css
/* Encabezados */
font-family: 'Readex Pro', sans-serif;
font-weight: 700;

/* Cuerpo y UI */
font-family: 'Readex Pro', sans-serif;
font-weight: 400;
```

Importar desde Google Fonts: `Readex+Pro:wght@400;700`. No usar fuentes del sistema.
Fraunces fue descartada por verse demasiado clásica. Inter fue reemplazada por Readex Pro 400 para unificar la tipografía.

---

## Estructura del Tema Impulse

```
/
├── assets/          → CSS, JS, imágenes del tema
├── config/
│   ├── settings_data.json    ← AQUÍ van los colores y tipografía
│   └── settings_schema.json  ← ⚠️ NO TOCAR sin entender bien la estructura
├── layout/
│   └── theme.liquid          → Layout principal
├── sections/        → Secciones del homepage y páginas
├── snippets/        → Fragmentos reutilizables
├── templates/       → Plantillas por tipo de página
└── locales/         → Traducciones
```

**Archivos de mayor impacto (editar con precaución):**
- `config/settings_data.json` — controla colores, tipografía y configuración visual global
- `layout/theme.liquid` — modifica el HTML base de TODAS las páginas
- `sections/header.liquid` — header principal
- `sections/footer.liquid` — footer

---

## Convenciones de Código

### Liquid
- Comentarios descriptivos en secciones modificadas: `{%- comment -%} JYE: descripción del cambio {%- endcomment -%}`
- No eliminar código original — comentarlo con `{%- comment -%} JYE: desactivado {%- endcomment -%}` antes de reemplazar
- Respetar la indentación existente del archivo

### CSS
- Usar variables CSS del tema (`var(--color-primary)`) en lugar de valores hex directos cuando sea posible
- Agregar modificaciones en bloques comentados:
  ```css
  /* === JYE CUSTOM: descripción === */
  .selector { ... }
  /* === END JYE CUSTOM === */
  ```
- No usar `!important` salvo que sea estrictamente necesario

### JavaScript
- No modificar archivos JS del tema base
- Si se necesita JS personalizado, agregarlo en un archivo separado: `assets/jye-custom.js`

---

## Reglas Críticas — NO Hacer

1. **NO modificar** `settings_schema.json` — rompe el editor visual de Shopify
2. **NO eliminar** secciones del tema — solo ocultarlas o comentarlas
3. **NO modificar** archivos de checkout — Shopify no lo permite y puede romper el proceso de pago
4. **NO usar** colores fuera de la paleta autorizada
5. **NO hacer** push directo a `main` — siempre trabajar en una rama y revisar antes de mergear
6. **NO subir** cambios sin hacer commit descriptivo primero

---

## Flujo de Trabajo con Git

```bash
# Antes de empezar cualquier cambio:
git pull origin main
git checkout -b feature/nombre-del-cambio

# Al terminar:
shopify theme push --theme-id=[ID_TEMA_DESARROLLO]
git add .
git commit -m "tipo: descripción corta del cambio"
git push origin feature/nombre-del-cambio
```

**Convención de commits:**
- `feat:` — nueva funcionalidad o sección
- `fix:` — corrección de bug o error visual
- `style:` — cambios de CSS/colores sin cambio de lógica
- `refactor:` — reorganización de código sin cambio visual
- `content:` — cambio de texto o imágenes

---

## Temas de Shopify — Contexto

- El tema de **producción** (el que ve el cliente) nunca se toca directamente
- Trabajar siempre sobre un **tema duplicado** en modo desarrollo
- Para publicar cambios: `shopify theme push` al tema de desarrollo → revisión → copiar cambios al tema de producción manualmente o via CLI
- Los cambios en `settings_data.json` se pueden hacer desde el editor visual de Shopify o directamente en el archivo

---

## Colecciones de Shopify

Las dos colecciones principales son:

**Por Categoría** (nombres exactos en Shopify):
- Juegos de Mesa
- Rompecabezas
- Arte y Manualidades
- Construcción
- Estimulación temprana
- Roles
- Deportes
- Libros
- Experimentos
- Musicales
- Matemáticas
- Lenguaje
- Refuerzo didáctico
- Carros montables
- Figuras coleccionables
- Vehículos coleccionables
- Productos nacionales

**Por Edad** (nombres exactos en Shopify):
- 0 a 1 años
- 1 a 3 años
- 3 a 5 años
- 5 a 7 años
- 7 a 12 años
- 12 a 99 años

---

## Fases del Proyecto

Ver `PRD.md` sección 10 para el detalle completo. Resumen:

- **Fase 1:** Colores + tipografía + header + footer + homepage base
- **Fase 2:** Páginas de colección y producto
- **Fase 3:** Optimización mobile + búsqueda + trust badges
- **Fase 4:** Conversión (carrito, newsletter, WhatsApp, QA)

**Fase activa actual:** Fase 4 (final)

---

## Contexto de Audiencia y Comportamiento (datos Wix, mayo 2025–2026)

> Estos datos provienen de la tienda anterior en Wix. Sirven como línea base para
> decisiones de diseño y priorización. Revisarlos después de 3 meses en Shopify.

**Dispositivos:**
- 72.8% mobile · 26.8% desktop · 0.5% tablet
- Toda decisión de diseño y CSS debe pensarse **mobile-first**

**Browsers y sistema operativo:**
- Chrome es el browser dominante (Android gama media)
- 65% de usuarios mobile están en Android, 35% en iOS
- Probar siempre en Chrome/Android como dispositivo primario antes de desktop

**SEO — colecciones por edad:**
- Las colecciones por edad triplican en tráfico al homepage — son el principal canal SEO del negocio

**Búsqueda interna — términos más buscados:**
- Por marca (ejemplos): Clementoni, Lego, Maisto, Catan — hay muchas más
- Por categoría (ejemplos): Rompecabezas, Carro/Carros — hay muchas más
- Todas las marcas y categorías del catálogo deben estar bien cubiertas en tags y metafields para que el buscador las encuentre

---

## Contacto del Proyecto

**Responsable:** Alejo Meek  
**Repositorio:** https://github.com/alejomeek/pagina-shopify  
**Tienda Shopify:** https://jugando-y-educando-2.myshopify.com/
