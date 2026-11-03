# Terrenalis

Web corporativa de Terrenalis: importación y exportación de azulejos, baldosas cerámicas, gres porcelánico y revestimientos (B2B).

Publicada en https://estebanpichel.github.io/terrenalis/

## Estructura

```
.
├── index.html              # Portada: hero, empresa, productos, fabricantes,
│                           # importación/exportación, mercados y contacto
├── pages/
│   ├── productos.html      # Detalle de las seis categorías de producto
│   ├── privacidad.html     # Política de privacidad (texto provisional)
│   └── aviso-legal.html    # Aviso legal (texto provisional)
├── css/styles.css          # Estilos globales (mobile first)
├── js/
│   ├── config.js           # Datos de la empresa: WhatsApp, correo, mercados
│   └── main.js             # Menú, formulario, mapa y animaciones
└── assets/img/             # Logotipos e iconos
```

## Pendiente de completar

Todo lo que depende de datos reales de la empresa está marcado como pendiente en la web:

- **`js/config.js`**: número de WhatsApp, correo, teléfono, dirección y mercados (países de origen y destino). Al rellenarlos, el botón de WhatsApp, los datos de contacto y el mapa se actualizan solos.
- **Fabricantes** (`index.html`, sección `#fabricantes`): sustituir los cuatro bloques "Fabricante por confirmar".
- **Colecciones** (`pages/productos.html`): cada categoría muestra "Colecciones en preparación".
- **Páginas legales**: completar razón social, NIF, domicilio y revisar los textos.
- **Formulario**: con `email` configurado abre el programa de correo del visitante con la solicitud preparada. Para recibir los envíos directamente hace falta un servicio de formularios (Formspree, Netlify Forms…).

## Fotografía

Las fotografías se cargan desde Unsplash (licencia gratuita, uso comercial permitido). Para usar fotos propias, guárdalas en `assets/img/` y cambia las URL en el HTML.

## Desarrollo local

```bash
python -m http.server 8000
```

y visita http://localhost:8000. Cada `git push` a `main` actualiza la web publicada.
