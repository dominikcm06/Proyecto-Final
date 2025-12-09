USE cinesocial;

-- 1. Insertar Usuarios
INSERT INTO users (first_name, last_name, username, email, password, bio) VALUES
('Alice', 'Smith', 'alice', 'alice@example.com', 'password123', 'Cinéfilo apasionado'),
('Bob', 'Jones', 'bob', 'bob@example.com', 'password123', 'Crítico amateur');

-- 2. Insertar Películas (Preservadas)
INSERT INTO movies (id, title, description, image_url, release_year) VALUES
(1, 'El Origen', 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños se le da la tarea inversa de plantar una idea en la mente de un C.E.O.', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg', 2010),
(2, 'Matrix', 'Un hacker aprende de rebeldes misteriosos sobre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.', 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 1999),
(3, 'Interstellar', 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg', 2014),
(4, 'Oppenheimer', 'La historia del científico J. Robert Oppenheimer y su rol en el desarrollo de la bomba atómica.', 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', 2023),
(5, 'Barbie', 'Barbie sufre una crisis existencial que la lleva a cuestionar su mundo y su existencia.', 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 2023),
(6, 'Dune: Parte Dos', 'Paul Atreides se une a Chani y a los Fremen en un viaje de venganza contra los conspiradores.', 'https://image.tmdb.org/t/p/w500/cxevDYdeFkiixRShbObdwAHBZry.jpg', 2024),
(7, 'Deadpool & Wolverine', 'Wolverine se recupera de sus heridas cuando se cruza con el mercenario bocazas.', 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', 2024),
(8, 'Inside Out 2', 'Nuevas emociones llegan a la mente de Riley mientras navega por la adolescencia.', 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg', 2024),
(9, 'Furiosa', 'El origen de la guerrera renegada Furiosa antes de encontrarse con Mad Max.', 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', 2024),
(10, 'Godzilla y Kong', 'Dos antiguos titanes se enfrentan en una batalla espectacular.', 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg', 2024),
(11, 'Civil War', 'Un viaje a través de una América distópica en un futuro cercano.', 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg', 2024),
(12, 'Avatar', 'Un marine parapléjico enviado a la luna Pandora en una misión única se debate entre seguir órdenes y proteger el mundo.', 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg', 2009),
(13, 'Avengers: Endgame', 'Los Vengadores restantes deben reunir a sus aliados para restaurar el equilibrio en el universo.', 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg', 2019),
(14, 'Titanic', 'Una aristócrata de diecisiete años se enamora de un artista pobre a bordo del lujoso Titanic.', 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 1997),
(15, 'Star Wars: A New Hope', 'Luke Skywalker une fuerzas con un caballero Jedi, un piloto engreído y dos droides.', 'https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg', 1977),
(16, 'El Padrino', 'El patriarca envejecido de una dinastía del crimen organizado transfiere el control a su hijo reacio.', 'https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 1972),
(17, 'Pulp Fiction', 'Las vidas de dos sicarios, un boxeador y dos bandidos se entrelazan en cuatro historias de violencia.', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 1994),
(18, 'El Caballero Oscuro', 'Batman debe aceptar uno de los mayores tests psicológicos y físicos para luchar contra el Joker.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 2008),
(19, 'Forrest Gump', 'Las presidencias de Kennedy y Johnson, Vietnam y Watergate a través de los ojos de un hombre de Alabama.', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 1994);

-- 3. Insertar Reseñas (2 por película, usando nuevos campos)
INSERT INTO reviews (user_id, movie_id, title, rating, comment, is_public, contains_spoilers, would_recommend) VALUES
-- Película 1
(1, 1, 'Increíble', 5, 'Una obra maestra de Nolan.', 1, 0, 1),
(2, 1, 'Confusa pero buena', 4, 'Me perdí un poco pero visualmente es genial.', 1, 0, 1),
-- Película 2
(1, 2, 'Clásico', 5, 'Definió una generación.', 1, 0, 1),
(2, 2, 'Revolucionaria', 5, 'Los efectos siguen vigentes.', 1, 0, 1),
-- Película 3
(1, 3, 'Emotiva', 5, 'Lloré al final.', 1, 0, 1),
(2, 3, 'Larga', 4, 'Un poco lenta pero vale la pena.', 1, 0, 1),
-- Película 4
(1, 4, 'Impactante', 5, 'Cillian Murphy está increíble.', 1, 0, 1),
(2, 4, 'Densa', 4, 'Mucho diálogo politico.', 1, 0, 1),
-- Película 5
(1, 5, 'Divertida', 4, 'Más profunda de lo que parece.', 1, 0, 1),
(2, 5, 'Colorida', 5, 'Diseño de producción impecable.', 1, 0, 1),
-- Película 6
(1, 6, 'Épica', 5, 'Mejor que la primera parte.', 1, 0, 1),
(2, 6, 'Visually stunning', 5, 'Villeneuve es un genio.', 1, 0, 1),
-- Película 7
(1, 7, 'Hilarante', 4, 'Mucho fan service del bueno.', 1, 0, 1),
(2, 7, 'Sangrienta', 4, 'Acción sin parar.', 1, 0, 1),
-- Película 8
(1, 8, 'Necesaria', 5, 'Ansiedad muy bien representada.', 1, 0, 1),
(2, 8, 'Para todos', 4, 'Pixar lo hizo de nuevo.', 1, 0, 1),
-- Película 9
(1, 9, 'Adrenalina', 4, 'Anya Taylor-Joy lo hace genial.', 1, 0, 1),
(2, 9, 'Diferente', 4, 'No es Fury Road pero se sostiene.', 1, 0, 1),
-- Película 10
(1, 10, 'Puro espectáculo', 3, 'Trama tonta, peleas geniales.', 1, 0, 0),
(2, 10, 'Palomera', 4, 'Para ver en pantalla grande.', 1, 0, 1),
-- Película 11
(1, 11, 'Perturbadora', 4, 'Te deja pensando.', 1, 0, 1),
(2, 11, 'Intensa', 5, 'Sonido increible.', 1, 0, 1),
-- Película 12
(1, 12, 'Visualmente única', 4, 'La historia es Pocahontas pero en el espacio.', 1, 0, 1),
(2, 12, 'Inmersiva', 5, 'El 3D fue revolucionario.', 1, 0, 1),
-- Película 13
(1, 13, 'El fin de una era', 5, 'El evento cinematográfico de la década.', 1, 1, 1),
(2, 13, 'Demasiado larga', 3, 'Buen cierre pero duró mucho.', 1, 0, 1),
-- Película 14
(1, 14, 'Romántica', 5, 'Nunca la olvidaré.', 1, 0, 1),
(2, 14, 'Triste', 4, 'Si cabían los dos en la tabla.', 1, 0, 0),
-- Película 15
(1, 15, 'El inicio', 5, 'La magia del cine.', 1, 0, 1),
(2, 15, 'Aventuras', 5, 'Efectos prácticos inigualables.', 1, 0, 1),
-- Película 16
(1, 16, 'Obra maestra', 5, 'Cine en su máxima expresión.', 1, 0, 1),
(2, 16, 'Lenta pero segura', 5, 'Actuaciones de otro nivel.', 1, 0, 1),
-- Película 17
(1, 17, 'Tarntino puro', 5, 'Diálogos memorables.', 1, 0, 1),
(2, 17, 'Cool', 4, 'La banda sonora es top.', 1, 0, 1),
-- Película 18
(1, 18, 'El mejor Joker', 5, 'Heath Ledger leyenda.', 1, 0, 1),
(2, 18, 'Oscura', 5, 'La mejor película de superhéroes.', 1, 0, 1),
-- Película 19
(1, 19, 'Entrañable', 5, 'Run Forrest Run!', 1, 0, 1),
(2, 19, 'Inocente', 4, 'Tom Hanks genial.', 1, 0, 1);

-- 4. Insertar Watchlists
INSERT INTO watchlists (user_id, name, description, is_public, category, priority, target_date) VALUES
(1, 'Favoritas de Alice', 'Mis películas top', 1, 'General', 'Alta', '2025-12-31'),
(2, 'Pendientes de Bob', 'Lo que tengo que ver', 0, 'Thriller', 'Media', '2025-06-30');

-- 5. Insertar Películas en Watchlists (2 por lista)
INSERT INTO watchlist_movies (watchlist_id, movie_id) VALUES
(1, 1), -- Alice: El Origen
(1, 3), -- Alice: Interstellar
(2, 2), -- Bob: Matrix
(2, 4); -- Bob: Oppenheimer
