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
## 🐳 Despliegue con Docker (Bonus)

```bash
# Build de la imagen
docker build -t rick-morty-app .

# Run del contenedor
docker run -p 4000:4000 rick-morty-app
```

Disponible en:
http://localhost:4000

---

## 🛠️ Troubleshooting

### 🔴 Puerto en uso
```bash
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```
### 🔴 Docker no inicia
- Virtualización: Asegúrate de habilitar la virtualización en BIOS (SVM Mode para AMD o VT-x para Intel).

- Red/SSL: Si fallan las descargas de imágenes, verifica que el firewall o antivirus no bloqueen la conexión con docker.io.

- WSL2: Ejecuta wsl --update en PowerShell como administrador si el motor de Docker no arranca.

--- 

## 👨‍💻 Autor

Cristian Camilo
Ingeniero de Sistemas & Frontend Developer