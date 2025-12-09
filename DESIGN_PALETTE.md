# Paleta de Colores y Diseño - Cinesocial

Este documento detalla los estilos visuales utilizados en la aplicación, cumpliendo con el requerimiento de documentación de diseño.

## Paleta de Colores

La aplicación utiliza un tema oscuro ("Cinematic Dark Mode") con acentos vibrantes para resaltar acciones importantes.

### Colores Principales
| Color | Hex | Uso Principal |
|-------|-----|---------------|
| **Fondo Principal** | `#14181C` | Fondo general de la página (`body`). Color muy oscuro para reducir fatiga visual. |
| **Fondo Secundario**| `#1F252D` | Fondo de tarjetas y contenedores (`.card`, input fields). |
| **Texto Principal** | `#FFFFFF` | Títulos y contenido principal. |
| **Texto Secundario**| `#99AABB` | Metadatos, fechas y descripciones secundarias. |

### Colores de Acento
| Color | Hex | Uso Principal |
|-------|-----|---------------|
| **Verde Neón (Principal)** | `#00E054` | Botones primarios, enlaces activos, bordes en foco. |
| **Naranja (Advertencia)** | `#FF8000` | Botones de acción secundaria, insignias "Media Prioridad". |
| **Rojo (Peligro/Importante)**| `#dc3545` | (Bootstrap Danger) Insignias de "Alta Prioridad", errores. |
| **Azul (Informativo)** | `#0dcaf0` | (Bootstrap Info) Insignias de "Baja Prioridad". |

## Tipografía
- **Fuente Principal**: `'Poppins', sans-serif`.
- **Pesos**:
    - 300 (Light) para descripciones largas.
    - 400 (Regular) para texto base.
    - 600 (Semi-Bold) para botones y subtítulos.
    - 700 (Bold) para títulos principales (`h1`, `h2`).

## Componentes de Diseño
1.  **Glassmorphism**: Se utiliza una ligera transparencia en el Navbar (`rgba(20, 24, 28, 0.95)`) con un borde sutil para separarlo del contenido.
2.  **Sombras**: `box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5)` en estados `:hover` para dar profundidad.
3.  **Bordes**: Radio de borde de `8px` en todas las tarjetas y botones para una apariencia moderna pero estructurada.
