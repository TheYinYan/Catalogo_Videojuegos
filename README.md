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

##  Preguntas Final


1. **¿Qué responsabilidad tiene GameService?**

    Se encarga de comunicarse con el servidor para obtener, buscar, filtrar y enviar los videojuegos.

2. **¿Por qué AppComponent no debería utilizar directamente HttpClient?**
   Porque es mejor que AppComponent se encargue de mostrar los datos y GameService de comunicarse con el servidor.

3. **¿Qué diferencia existe entre GET /games y GET /games/5?**
   GET /games obtiene todos los videojuegos y GET /games/5 obtiene solamente el videojuego con ID 5.

4. **¿Qué representa ?genre=RPG?**
   Sirve para buscar solamente los videojuegos del género RPG.

5. **¿Qué evento DOM genera normalmente un <select> cuando cambia su selección?**
   El evento change.

6. **¿Cómo se captura dicho evento en Angular?**
   Utilizando (change) en el HTML.

7. **¿Qué representa $event?**
   Es el evento que se ha producido, por ejemplo, cuando cambiamos una opción del select.

8. **¿Qué ventaja tiene utilizar una referencia #genreSelect?**
   Nos permite obtener directamente el valor seleccionado sin utilizar $event.

9. **¿Qué diferencia existe entre title_like=Dragon y q=Dragon?**
   title_like=Dragon busca Dragon dentro del título y q=Dragon busca Dragon en todos los campos del videojuego. 

10. **¿Para qué sirven _page y _limit?**
    _page indica la página que queremos ver y _limit cuántos videojuegos queremos mostrar por página.

11. **¿Por qué this.http.get<Game[]>(url) no permite normalmente acceder directamente a las cabeceras?**
    Porque normalmente solo devuelve los datos de los videojuegos, no toda la respuesta.

12. **¿Qué conseguimos utilizando observe: 'response'?**
    Podemos acceder tanto a los videojuegos como a las cabeceras de la respuesta. 

13. **¿Dónde se encuentran los videojuegos en una HttpResponse<Game[]>?**
    En response.body. 

14. **¿Dónde se encuentran las cabeceras HTTP?**
    En response.headers. 

15. **¿Qué información proporciona X-Total-Count?**
    Indica el número total de videojuegos que cumplen los filtros, no solo los que aparecen en esa página. 

16. **¿Por qué debemos convertir X-Total-Count a number?**
    Porque nos llega como texto y necesitamos un número para hacer cálculos. 

17. **¿Cómo calculamos el número total de páginas?**
    Dividiendo el total de videojuegos entre los videojuegos por página y redondeando hacia arriba.

18. ¿Por qué debemos volver a la página 1 cuando se modifica un filtro?
    Porque puede que con el nuevo filtro no haya suficientes videojuegos para llegar a la página en la que estábamos.

