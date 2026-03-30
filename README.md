# RickMortyApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.23.

---

## 🚀 Resumen de la Prueba Técnica

Aplicación construida con Angular 19 que implementa Server-Side Rendering (SSR), manejo de estado reactivo y una arquitectura desacoplada basada en patrones de diseño, con enfoque en rendimiento, escalabilidad y experiencia de usuario.

### Especificaciones Técnicas y Alcance:

- **SSR Obligatorio:** La vista de la grilla (`/characters`) se renderiza en el servidor.
- **Gestión de Estado:** Manejo centralizado de favoritos mediante un enfoque reactivo (Facade + Store).
- **Persistencia Inteligente:** Sincronización del estado con `localStorage` para mantener favoritos entre sesiones (`storageMetaReducer`).
- **Arquitectura de Software:**
  - **Repository Pattern:** Aislamiento de la lógica de acceso a datos.
  - **Facade Pattern:** Abstracción de la lógica para simplificar los componentes.
- **Optimización UX:** Uso de `withEventReplay` para evitar pérdida de eventos durante la hidratación SSR.
- **Responsive Design:** Interfaz adaptativa para móviles, tablets y escritorio.

---

## 🧠 Decisiones de Arquitectura y Optimización

### 💾 Estrategia de Persistencia de Favoritos (Hydration from Source)
Se implementó una estrategia de **persistencia atómica** para la gestión de favoritos, priorizando la integridad de los datos:

* **Almacenamiento Eficiente:** En el estado global (Store) y `localStorage` únicamente se persisten los **IDs** de los personajes. Esto evita saturar el almacenamiento del navegador y cumple con límites de escalabilidad.
* **Consistencia en Tiempo Real:** En lugar de mostrar datos estáticos guardados hace días, la aplicación utiliza el endpoint multiobjeto de la API (`/character/[ids]`) para obtener información fresca (Status, Location, Last Seen) cada vez que se consulta la lista de favoritos.
* **Reactividad:** Se utiliza un flujo de RxJS con `switchMap` en la Fachada para sincronizar automáticamente la vista cuando la lista de IDs cambia, garantizando que el usuario siempre vea datos actualizados directamente de la fuente oficial.

---

## 🗺️ Estructura de Rutas y Vistas

La aplicación cumple con las 3 vistas requeridas en el alcance funcional:

1. **Vista de Grilla (`/characters`):**
   - **SSR Real:** Renderizada desde el servidor para entrega inmediata.
   - Paginación funcional (Siguiente/Anterior).
   - Tarjetas informativas con navegación al detalle.

2. **Vista de Detalle (`/characters/:id`):**
   - Consumo dinámico de la API por ID.
   - Visualización de más de 5 campos técnicos del personaje.
   - **Gestión de Favoritos:** Botón interactivo para agregar/quitar de la Store global.

3. **Vista de Favoritos (`/favorites`):**
   - Listado de personajes persistidos en la Store.
   - Acceso directo al detalle y opción de gestión de la lista(eliminar).

---

## 🛠️ Guía de Ejecución Local

### 📋 Requisitos de Entorno
Para garantizar la estabilidad del proyecto, se recomienda el uso de Docker.

Entorno Recomendado (Contenedor): Docker Desktop (con motor WSL2 en Windows). El Dockerfile utiliza Node v20.19.2, que es la versión de referencia para esta build.

Entorno Local (Mínimos): Si prefieres ejecutarlo nativamente, los requisitos son:

Node.js: v18.19.1 o superior (Versión mínima requerida por Angular 19).

NPM: v9.x o superior.

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Servidor de Desarrollo

```bash
npm start
```
Abrir en:
http://localhost:4200/

### 3. Ejecución en Producción SSR

```bash
# Construir cliente + servidor
npm run build

# Ejecutar servidor SSR
npm run serve:ssr:rick-morty-app
```
Disponible en:
http://localhost:4000

--- 
## 🐳 Ejecucion con Docker (Bonus)(Recomendado)

```bash
# Build de la imagen
docker build -t rick-morty-app .

# Run del contenedor
docker run -p 4000:4000 rick-morty-app
```

Disponible en:
http://localhost:4000

---

### 🧪 Ejecución de Pruebas Unitarias
Para validar la lógica de componentes, fachada y servicios:
```bash
npm run test
```

---
## 🛠️ Solución de Problemas (Troubleshooting)

### 🔴 Docker no inicia
- Virtualización: Asegúrate de habilitar la virtualización en BIOS (SVM Mode para AMD o VT-x para Intel).

- Red/SSL: Si fallan las descargas de imágenes, verifica que el firewall o antivirus no bloqueen la conexión con docker.io.

- WSL2: Ejecuta wsl --update en PowerShell como administrador si el motor de Docker no arranca.

### 🔴 Parpadeo (Flicker) en Imágenes y Fuentes
Si al navegar por la grilla notas un parpadeo visual en las fotos o el texto durante la hidratación:

Causa: Este comportamiento ocurre únicamente si tienes las Chrome DevTools abiertas con la opción "Inhabilitar caché" (Disable Cache) marcada en la pestaña Network.

Explicación: Al inhabilitar el caché, el navegador ignora los recursos servidos por el SSR y fuerza una nueva descarga desde el cliente durante la hidratación.

--- 

## 👨‍💻 Autor

Cristian Camilo
Ingeniero de Sistemas & Frontend Developer