# 🎮 Catálogo de Videojuegos con Angular y JSON Server

Este proyecto consiste en el desarrollo de un catálogo de videojuegos utilizando **Angular** para el frontend y **JSON Server** como una API REST local para el backend. El objetivo principal es practicar el uso de `HttpClient`, servicios (Services), inyección de dependencias y la comunicación con una API.

## 🚀 Requisitos previos
- Node.js y npm instalados.
- Angular CLI instalado (`npm install -g @angular/cli`).

## ⚙️ Instalación y ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Instalar JSON Server (versión clásica):**
   ```bash
   npm install --save-dev json-server@0.17.4
   ```

3. **Arrancar la API (Backend):**
   Abre una terminal y ejecuta:
   ```bash
   npm run api
   ```
   *Esto levantará el servidor en `http://localhost:3000/games` usando el archivo `db.json`.*

4. **Arrancar Angular (Frontend):**
   Abre otra terminal y ejecuta:
   ```bash
   ng serve -o
   ```

---

## ✅ Funcionalidades implementadas (Hasta el punto 18)

### 1. Arquitectura
- **`GameService`**: Encapsula todas las peticiones HTTP. El componente no conoce `HttpClient` directamente.
- **`AppComponent`**: Gestiona el estado de la interfaz, escucha los eventos del DOM y muestra los datos.
- **`Game` (Modelo)**: Interfaz TypeScript que define los datos (`id`, `title`, `genre`, `platform`, `price`).

### 2. Obtener todos los videojuegos
- El servicio cuenta con el método `getGames()` que hace un `GET /games`.
- Al iniciar, el componente carga todos los juegos y los muestra en pantalla con un bucle `@for`.

### 3. Buscar por ID
- Se ha añadido un buscador por ID.
- Utiliza una referencia de plantilla (`#buscarId`) y el evento `(click)` para llamar al método `getGame(id)` del servicio (`GET /games/:id`).

### 4. Búsqueda por Título
- Se ha añadido un buscador parcial por título.
- Utiliza la referencia `#buscarTitulo` y llama al servicio con el parámetro `?title_like=texto`.

### 5. Filtros combinados (Género, Plataforma y Precio)
- Se han añadido selectores (`<select>`) para filtrar por **Género** y **Plataforma**.
- Se han añadido inputs para filtrar por **Rango de Precio** (`price_gte` y `price_lte`).
- **Exclusión mutua**: Para evitar conflictos, si se aplica un filtro de precio, los selectores de género/plataforma se deshabilitan, y viceversa.
- Los filtros se combinan correctamente en las peticiones al servidor.

---

<!-- 
====================================================================
A PARTIR DE AQUÍ ESTÁ PENDIENTE DE IMPLEMENTAR (Comentado)
====================================================================
-->

<!--
## ⏳ Funcionalidades Pendientes (Puntos 19 en adelante)

### 19-20. Paginación
- [ ] Implementar `getGamesPage(page, limit)` en el servicio.
- [ ] Añadir parámetros `_page` y `_limit` a las peticiones HTTP.

### 21-27. Cabeceras HTTP y X-Total-Count
- [ ] Utilizar `observe: 'response'` en las peticiones para obtener la respuesta completa.
- [ ] Extraer los datos del `response.body`.
- [ ] Extraer el total de registros de la cabecera `X-Total-Count`.
- [ ] Convertir el valor de la cabecera a número (`Number(...)`).
- [ ] Calcular el número total de páginas usando `Math.ceil(totalItems / pageSize)`.

### 28. Método completo de carga
- [ ] Unificar la carga de datos en un método `loadGames()` que maneje los filtros, la página actual y actualice el `totalItems` y `totalPages`.

### 29-30. Controles de paginación en la interfaz
- [ ] Añadir botones de "Anterior" y "Siguiente".
- [ ] Deshabilitar el botón "Anterior" si `currentPage === 1`.
- [ ] Deshabilitar el botón "Siguiente" si `currentPage === totalPages`.
- [ ] Mostrar un indicador de texto: `Página {{ currentPage }} de {{ totalPages }}`.

### 31-32. Combinar filtros y paginación
- [ ] Asegurar que al cambiar cualquier filtro, se reinicie la `currentPage = 1`.
- [ ] Integrar todos los filtros existentes en la misma petición HTTP de paginación.

### 34-35. Refactorización con HttpParams
- [ ] Sustituir la concatenación manual de URLs por el uso de `HttpParams` de Angular para construir las consultas de forma limpia.
- [ ] Unificar todos los filtros y la paginación en un solo método `getGames(page, limit, genre, platform, minPrice, maxPrice)` en el servicio.

---

## 📝 Cuestionario Final (Punto 40)

*(Aquí debes responder a las preguntas teóricas de la actividad)*

1. **¿Qué responsabilidad tiene GameService?**
   R: 

2. **¿Por qué AppComponent no debería utilizar directamente HttpClient?**
   R: 

3. **¿Qué diferencia existe entre GET /games y GET /games/5?**
   R: 

4. **¿Qué representa ?genre=RPG?**
   R: 

5. **¿Qué evento DOM genera normalmente un <select> cuando cambia su selección?**
   R: 

6. **¿Cómo se captura dicho evento en Angular?**
   R: 

7. **¿Qué representa $event?**
   R: 

8. **¿Qué ventaja tiene utilizar una referencia #genreSelect?**
   R: 

9. **¿Qué diferencia existe entre title_like=Dragon y q=Dragon?**
   R: 

10. **¿Para qué sirven _page y _limit?**
    R: 

11. **¿Por qué this.http.get<Game[]>(url) no permite normalmente acceder directamente a las cabeceras?**
    R: 

12. **¿Qué conseguimos utilizando observe: 'response'?**
    R: 

13. **¿Dónde se encuentran los videojuegos en una HttpResponse<Game[]>?**
    R: 

14. **¿Dónde se encuentran las cabeceras HTTP?**
    R: 

15. **¿Qué información proporciona X-Total-Count?**
    R: 

16. **¿Por qué debemos convertir X-Total-Count a number?**
    R: 

17. **¿Cómo calculamos el número total de páginas?**
    R: 

18. **¿Por qué debemos volver a la página 1 cuando se modifica un filtro?**
    R: 
```
-->

### ¿Cómo usarlo?
1. Crea el archivo `README.md` en la raíz de tu proyecto.
2. Pega el contenido.
3. Cuando subas el proyecto a GitHub, se verá súper profesional.
4. A medida que vayas haciendo los puntos del 19 al 35 (paginación, `HttpParams`, etc.), puedes ir borrando los `<!--` y `-->` para que se vean en el README, y marcar las casillas con una `[x]`.