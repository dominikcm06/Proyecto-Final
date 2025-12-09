# Plan de Pruebas Maestro - CineSocial

Este documento contiene la lista definitiva de pruebas para validar la calidad y funcionalidad de CineSocial antes de la entrega final.

## 0. Preparación
- [ ] **Reset de Base de Datos**: Ejecutar `data.sql` en MySQL Workbench para limpiar y poblar la base de datos con datos de prueba.
- [ ] **Inicio de Servidores**: Confirmar que `npm run dev` (Backend) y `ng serve` (Frontend) están corriendo sin errores.

## 1. Autenticación y Seguridad
- [ ] **Registro de Usuario**:
    - Intentar registrarse con un email ya existente (debe fallar).
    - Registrar un usuario nuevo con todos los campos (Nombre, Apellido, User, Email, Password, Bio).
    - Verificar redirección automática al Login o Home tras registro exitoso.
- [ ] **Inicio de Sesión**:
    - Ingresar con credenciales incorrectas (debe mostrar error).
    - Ingresar con credenciales correctas (debe redirigir a Home).
    - Verificar que el menú de navegación cambia (muestra "Perfil" y "Cerrar Sesión").
- [ ] **Cierre de Sesión**:
    - Hacer clic en "Salir".
    - Verificar redirección al Login.
    - Intentar entrar a `/profile` manualmente (debe redirigir al Login).

## 2. Experiencia de Usuario (Home)
- [ ] **Carrusel Hero**:
    - Verificar que las imágenes tienen el efecto inclinado.
    - Confirmar que al pasar el mouse **NO** se deforman las imágenes.
    - Verificar que el carrusel avanza automáticamente o manualmente.
- [ ] **Catálogo de Películas**:
    - Verificar que se cargan las listas "Más Taquilleras", "Nuevos Estrenos", etc.
    - Verificar que no hay textos superpuestos en las tarjetas.
    - Confirmar que el botón "Watchlist" en la tarjeta funciona y redirige correctamente.

## 3. Sistema de Watchlists (Listas)
- [ ] **Creación**:
    - Crear una lista "Pública" y otra "Privada".
    - Usar las nuevas prioridades en español: **Alta**, **Media**, **Baja**.
    - Verificar que se guardan correctamente.
- [ ] **Gestión de Contenido**:
    - Agregar una película desde el Home.
    - Agregar una película manualmente desde el detalle de la lista (si aplica).
    - Verificar contador de películas en la tarjeta de la lista.
- [ ] **Visualización**:
    - Entrar al detalle de una lista.
    - Confirmar que la etiqueta de prioridad (Badge) tiene el color correcto (Rojo/Alta, Amarillo/Media, Azul/Baja).
    - Confirmar visibilidad de textos sobre fondos oscuros.

## 4. Sistema de Reseñas
- [ ] **Publicación**:
    - Escribir una reseña **Pública**. Verificar que aparece en el detalle de la película.
    - Escribir una reseña **Privada**. Verificar que **NO** aparece en el detalle de la película.
- [ ] **Perfil de Usuario**:
    - Ir a `Mi Perfil`.
    - Confirmar que ahí SÍ aparecen mis reseñas privadas (con icono de ojo tachado).
    - Verificar que se muestran los datos del usuario correctamente.

## 5. Navegación y Rutas
- [ ] **Rutas Inexistentes**:
    - Intentar ir a `http://localhost:4200/ruta-falsa`.
    - Verificar que redirige al Home (o muestra 404 si se implementó).
- [ ] **Persistencia**:
    - Recargar la página (F5) estando logueado.
    - Verificar que la sesión se mantiene activa.

## 6. Diseño Responsivo
- [ ] **Vista Móvil (F12 -> Dimensiones de Teléfono)**:
    - Verificar que el Navbar colapsa en menú hamburguesa.
    - Verificar que las tarjetas de películas se apilan verticalmente (1 o 2 por fila).
    - Verificar que los formularios no se desbordan horizontalmente.

## 7. Verificación de Datos (SQL)
- [ ] **Integridad**:
    - Revisar en MySQL que no haya usuarios duplicados tras las pruebas.
    - Confirmar que las fechas se guardan correctamente.
