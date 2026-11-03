# Terrenalis

Sitio web de Terrenalis.

## Estructura

```
.
├── index.html          # Página de inicio
├── pages/              # Resto de páginas
│   ├── about.html
│   └── contact.html
├── css/
│   └── styles.css      # Estilos globales
├── js/
│   └── main.js         # JavaScript del sitio
└── assets/
    ├── img/            # Imágenes y favicon
    └── fonts/          # Tipografías
```

## Desarrollo local

No necesita instalación. Abre `index.html` en el navegador o, para servirlo en local:

```bash
python -m http.server 8000
```

y visita http://localhost:8000.

## Publicación

Puede publicarse con GitHub Pages: en el repositorio, **Settings → Pages → Deploy from a branch → `main` / root**.
La web quedará en `https://estebanpichel.github.io/terrenalis/`.
