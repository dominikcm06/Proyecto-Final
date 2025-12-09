# Documentación de Código Fuente - CineSocial

Este documento lista todos los archivos de código del proyecto y su función.

## 🟢 Backend (Node.js/Express)
| Archivo | Descripción |
|---------|-------------|
| `backend/index.js` | Punto de entrada del servidor. Configura Express, middlewares y todas las rutas de la API REST. |
| `backend/db.js` | Configuración de la conexión a MySQL usando `mysql2/promise`. |

## 🔵 Base de Datos (MySQL)
| Archivo | Descripción |
|---------|-------------|
| `database/schema.sql` | Script DDL para crear la tablas (`users`, `movies`, `reviews`, `watchlists`, `watchlist_movies`). |
| `database/data.sql` | Script DML para poblar la base de datos con datos de prueba (usuarios, películas, reseñas). |

## 🔴 Frontend (Angular)

### Configuración y Núcleo
| Archivo | Descripción |
|---------|-------------|
| `frontend/src/main.ts` | Punto de entrada de la aplicación Angular. |
| `frontend/src/index.html` | HTML base que aloja la aplicación (`<app-root>`). |
| `frontend/src/styles.css` | Estilos globales y configuración de variables CSS. |
| `frontend/src/app/app.ts` | Componente raíz (`AppComponent`). Contiene el `<router-outlet>`. |
| `frontend/src/app/app.html` | Plantilla principal de la aplicación. |
| `frontend/src/app/app.routes.ts` | Definición de rutas y navegación de la aplicación. |
| `frontend/src/app/app.config.ts` | Configuración global de providers (HTTP, Router, etc.). |

### Servicios
| Archivo | Descripción |
|---------|-------------|
| `frontend/src/app/services/api.service.ts` | Servicio central para todas las peticiones HTTP al backend (GET/POST). |
| `frontend/src/app/services/auth.service.ts` | Gestiona el estado de sesión del usuario (Login/Logout/CurrentUser). |

### Modelos (Interfaces)
| Archivo | Descripción |
|---------|-------------|
| `frontend/src/app/models/movie.ts` | Interfaz TypeScript para objetos de tipo Película. |
| `frontend/src/app/models/review.ts` | Interfaz TypeScript para objetos de tipo Reseña. |

### Componentes

#### Layout
| Archivo | Descripción |
|---------|-------------|
| `navbar.component.ts/html/css` | Barra de navegación superior. Cambia según si el usuario está logueado. |
| `footer.component.ts/css` | Pie de página de la aplicación. |

#### Autenticación
| Archivo | Descripción |
|---------|-------------|
| `login.component.ts/html/css` | Formulario de inicio de sesión. |
| `register.component.ts/html/css` | Formulario de registro de nuevos usuarios. |

#### Vistas Principales
| Archivo | Descripción |
|---------|-------------|
| `home.component.ts/html/css` | Página de inicio. Muestra el carrusel y listados de películas. |
| `movie-detail.component.ts/html/css`| Vista detallada de una película. Muestra info, reseñas forms. |
| `user-profile.component.ts/html/css`| Perfil del usuario logueado. Datos personales e historial. |

#### Watchlists (Listas)
| Archivo | Descripción |
|---------|-------------|
| `my-watchlists.component.ts` | Muestra todas las listas creadas por el usuario. |
| `create-watchlist.component.ts` | Formulario para crear una nueva lista de seguimiento. |
| `watchlist-detail.component.ts` | Vista detallada de una lista específica (películas que contiene). |

#### Reutilizables
| Archivo | Descripción |
|---------|-------------|
| `review-form.component.ts/css` | Componente/Formulario encapsulado para crear reseñas. |
