# Catálogo de Videojuegos con Angular y JSON Server

Este proyecto consiste en el desarrollo de un catálogo de videojuegos utilizando **Angular** para el frontend y **JSON Server** como una API REST local para el backend. El objetivo principal es practicar el uso de `HttpClient`, servicios (Services), inyección de dependencias, filtrado, paginación y comunicación con una API.

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

## ✅ Funcionalidades implementadas

### 1. Arquitectura
- **`GameService`**: Encapsula todas las peticiones HTTP. El componente no conoce `HttpClient` directamente.
- **`AppComponent`**: Gestiona el estado de la interfaz, escucha los eventos del DOM y muestra los datos.
- **`Game` (Modelo)**: Interfaz TypeScript que define los datos (`id`, `title`, `genre`, `platform`, `price`).

### 2. Obtener todos los videojuegos
- El servicio cuenta con el método `getGames()` que hace un `GET /games`.
- Al iniciar, el componente carga todos los juegos y los muestra en pantalla con un bucle `@for`.

### 3. Buscar por ID y Título
- **Por ID**: Utiliza una referencia de plantilla (`#buscarId`) y el evento `(click)` para llamar al método `getGame(id)` del servicio (`GET /games/:id`).
- **Por Título**: Utiliza la referencia `#buscarTitulo` y llama al servicio con el parámetro `?title_like=texto` para búsqueda parcial.

### 4. Filtros combinados (Género, Plataforma y Precio)
- Se han añadido selectores (`<select>`) para filtrar por **Género** y **Plataforma**.
- Se han añadido inputs para filtrar por **Rango de Precio** (`price_gte` y `price_lte`).
- **Exclusión mutua**: Si se aplica un filtro de precio, los selectores de género/plataforma se deshabilitan, y viceversa, para evitar conflictos.
- Los filtros se combinan correctamente en las peticiones al servidor.

### 5. Paginación (Puntos 19 al 35)
- Se ha implementado el método `getGamesPage(page, limit)` en el servicio.
- Se utilizan los parámetros `_page` y `_limit` de JSON Server.
- Se lee la cabecera HTTP `X-Total-Count` (utilizando `observe: 'response'`) para obtener el número total de registros y calcular el total de páginas con `Math.ceil()`.
- **Controles de interfaz**: Botones de "Anterior" y "Siguiente" que se deshabilitan automáticamente al llegar a los límites.
- **Reinicio de página**: Al cambiar cualquier filtro, la página vuelve automáticamente a la 1.
- **Refactorización**: Uso de `HttpParams` para construir las URLs dinámicamente según los filtros aplicados y la página actual.

---

## 🎨 Diseño
Se ha implementado un diseño inspirado en tiendas de videojuegos (estilo Steam) con tema oscuro, tarjetas con efectos hover y resaltado verde para los precios.

---

## 📝 Preguntas Finales

1. **¿Qué responsabilidad tiene GameService?**

   Se encarga de comunicarse con el servidor para obtener, buscar, filtrar y enviar los videojuegos.

2. **¿Por qué AppComponent no debería utilizar directamente HttpClient?**

   Porque es mejor que AppComponent se encargue de mostrar los datos y GameService de comunicarse con el servidor (separación de responsabilidades).

3. **¿Qué diferencia existe entre GET /games y GET /games/5?**

   `GET /games` obtiene todos los videojuegos y `GET /games/5` obtiene solamente el videojuego con ID 5.

4. **¿Qué representa ?genre=RPG?**

   Sirve para buscar solamente los videojuegos del género RPG.

5. **¿Qué evento DOM genera normalmente un `<select>` cuando cambia su selección?**

   El evento `change`.

6. **¿Cómo se captura dicho evento en Angular?**
   Utilizando `(change)` en el HTML.

7. **¿Qué representa $event?**
   Es el evento que se ha producido, por ejemplo, cuando cambiamos una opción del select.

8. **¿Qué ventaja tiene utilizar una referencia #genreSelect?**
   Nos permite obtener directamente el valor seleccionado sin utilizar `$event`.

9. **¿Qué diferencia existe entre title_like=Dragon y q=Dragon?**

   `title_like=Dragon` busca Dragon dentro del título y `q=Dragon` busca Dragon en todos los campos del videojuego.

10. **¿Para qué sirven _page y _limit?**

    `_page` indica la página que queremos ver y `_limit` cuántos videojuegos queremos mostrar por página.

11. **¿Por qué this.http.get<Game[]>(url) no permite normalmente acceder directamente a las cabeceras?**

    Porque normalmente solo devuelve los datos de los videojuegos (el body), no toda la respuesta.

12. **¿Qué conseguimos utilizando observe: 'response'?**

    Podemos acceder tanto a los videojuegos (body) como a las cabeceras (headers) de la respuesta.

13. **¿Dónde se encuentran los videojuegos en una HttpResponse<Game[]>?**

    En `response.body`.

14. **¿Dónde se encuentran las cabeceras HTTP?**

    En `response.headers`.

15. **¿Qué información proporciona X-Total-Count?**

    Indica el número total de videojuegos que cumplen los filtros, no solo los que aparecen en esa página.

16. **¿Por qué debemos convertir X-Total-Count a number?**

    Porque nos llega como texto (string) y necesitamos un número para hacer cálculos.

17. **¿Cómo calculamos el número total de páginas?**

    Dividiendo el total de videojuegos entre los videojuegos por página y redondeando hacia arriba (`Math.ceil`).

18. **¿Por qué debemos volver a la página 1 cuando se modifica un filtro?**

    Porque puede que con el nuevo filtro no haya suficientes videojuegos para llegar a la página en la que estábamos.