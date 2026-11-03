# Terrenalis

Landing page corporativa de Terrenalis: importación y exportación de azulejos y productos cerámicos.

Publicada en https://estebanpichel.github.io/terrenalis/

## Estructura

La portada tiene seis bloques: cabecera, hero, presentación (`#empresa`), productos (`#productos`), contacto (`#contacto`) y footer.

```
.
├── index.html              # Landing page
├── pages/
│   ├── privacidad.html     # Política de privacidad (texto provisional)
│   └── aviso-legal.html    # Aviso legal (texto provisional)
├── css/styles.css          # Estilos globales (mobile first)
├── js/
│   ├── config.js           # Datos de la empresa: WhatsApp, correo, teléfono, dirección
│   └── main.js             # Menú, formulario y animaciones
└── assets/img/             # Logotipos e iconos
```

## Pendiente de completar

- **`js/config.js`**: número de WhatsApp, correo, teléfono y dirección. Al rellenarlos aparecen en la sección de contacto y en el footer, y se activan los enlaces de WhatsApp. Los datos vacíos no se muestran.
- **Páginas legales**: completar razón social, NIF, domicilio y revisar los textos.
- **Formulario**: con `email` configurado abre el programa de correo del visitante con el mensaje preparado. Para recibir los envíos directamente hace falta un servicio de formularios (Formspree, Netlify Forms…).

## Fotografía

Las fotografías se cargan desde Unsplash (licencia gratuita, uso comercial permitido). Para usar fotos propias, guárdalas en `assets/img/` y cambia las URL en `index.html`.

## Desarrollo local

```bash
python -m http.server 8000
```

y visita http://localhost:8000. Cada `git push` a `main` actualiza la web publicada.
