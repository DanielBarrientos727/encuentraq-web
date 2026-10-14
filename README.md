# EncuentraQ

> Una plataforma web comunitaria para reportar, buscar y recuperar objetos perdidos en el departamento del Quindío, Colombia.

![Estado](https://img.shields.io/badge/estado-Producci%C3%B3n-217A4B?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-MIT-3D9865?style=flat-square)
![Diseño](https://img.shields.io/badge/diseño-Responsive%20%2F%20PWA-378ADD?style=flat-square)
![Región](https://img.shields.io/badge/región-Quindío-BA7517?style=flat-square)

---

## ¿Qué es EncuentraQ?

**EncuentraQ** es una aplicación web diseñada para facilitar la publicación, búsqueda y recuperación de objetos perdidos o encontrados en los municipios del Quindío (Armenia, Calarcá, Salento, Montenegro, Circasia, Quimbaya, La Tebaida y Filandia).

Conecta de forma sencilla a las personas que han perdido un objeto con quienes lo han encontrado, priorizando la privacidad y la seguridad comunitaria mediante encuentros en lugares públicos.

---

## Características Principales (Versión 1.0)

* **Búsqueda Avanzada y Filtros:** Búsqueda en tiempo real por texto, filtrado por municipio, categoría (documentos, llaves, tecnología, etc.), estado (perdido/encontrado) y ordenamiento cronológico.
* **Publicación Local de Reportes:** Formulario completo con validación y carga de imágenes que almacena los reportes de forma persistente en el navegador (`localStorage`).
* **Gestión de Actividad y Estado:** Panel personal para administrar tus reportes creados, marcarlos como resueltos o eliminarlos.
* **Favoritos:** Guarda tus publicaciones de interés para consultarlas rápidamente.
* **Aplicación Web Progresiva (PWA):** Instalable en teléfonos y computadores, con funcionamiento offline básico y caché optimizada para GitHub Pages (`/encuentraq-web/`).
* **Diseño Adaptable (Responsive):** Interfaz optimizada tanto para escritorio como para dispositivos móviles con navegación táctil fluida.

---

## Limitaciones Importantes (Datos Locales)

* **Sin Backend ni Sincronización en la Nube:** Todos los reportes creados y favoritos se guardan exclusivamente en el almacenamiento local (`localStorage`) de tu navegador. No se comparten con otros usuarios ni dispositivos.
* **Privacidad:** No se recopilan datos personales, documentos de identidad ni direcciones privadas.

---

## Instalación y Desarrollo Local

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DanielBarrientos727/encuentraq-web.git
   cd encuentraq-web
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compila para producción:
   ```bash
   npm run build
   ```

---

## Despliegue en GitHub Pages

El proyecto está configurado para ser publicado automáticamente en GitHub Pages en la ruta base `/encuentraq-web/`.

---

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](LICENSE).
