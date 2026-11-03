# Terrenalis

Web corporativa de Terrenalis: importación y exportación de azulejos y productos cerámicos.

Publicada en https://estebanpichel.github.io/terrenalis/

## Estructura

Cada página tiene cabecera azul oscura con el logo y el menú, su contenido, el bloque «Solicita información» con el formulario y el footer.

```
.
├── index.html                  # Inicio: foto a pantalla completa con eslóganes
├── pages/
│   ├── sobre-nosotros.html     # Presentación de la empresa
│   ├── productos.html          # Las cinco categorías de producto
│   ├── contacto.html           # Solo el formulario de contacto
│   ├── privacidad.html         # Política de privacidad (texto provisional)
│   └── aviso-legal.html        # Aviso legal (texto provisional)
├── css/styles.css              # Estilos globales
├── js/
│   ├── config.js               # WhatsApp, correo, teléfono y redes sociales
│   └── main.js                 # Menú, datos de contacto y formulario
└── assets/img/                 # Logotipos e iconos
```

La cabecera, el bloque de contacto y el footer se repiten en cada página: un cambio en ellos hay que hacerlo en todas.

## Pendiente de completar

- **`js/config.js`**: WhatsApp, correo, teléfono y enlaces a Instagram, Facebook y LinkedIn. Al rellenarlos aparecen junto al formulario y en el footer; los vacíos no se muestran.
- **Páginas legales**: completar razón social, NIF, domicilio y revisar los textos.
- **Formulario**: con `email` configurado abre el programa de correo del visitante con el mensaje preparado. Para recibir los envíos directamente hace falta un servicio de formularios (Formspree, Netlify Forms…).

## Fotografía

Las fotografías se cargan desde Unsplash (licencia gratuita, uso comercial permitido). Para usar fotos propias, guárdalas en `assets/img/` y cambia las URL en el HTML.

## Desarrollo local

```bash
python -m http.server 8000
```

y visita http://localhost:8000. Cada `git push` a `main` actualiza la web publicada.
