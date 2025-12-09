const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();
const port = 3000;

// Middleware (Configuración de intermediarios)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registro global (Logging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// --- RUTAS ---

// 1. Usuarios
// Registro
app.post('/api/register', async (req, res) => {
    try {
        const { first_name, last_name, username, email, password, bio } = req.body;
        const [result] = await connection.promise().query(
            'INSERT INTO users (first_name, last_name, username, email, password, bio) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, username, email, password, bio]
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registro fallido', details: err.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

        const user = rows[0];
        if (user.password !== password) return res.status(401).json({ error: 'Credenciales inválidas' });

        res.json({ message: 'Login exitoso', user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fallo en el inicio de sesión' });
    }
});

// Perfil de Usuario
app.get('/api/users/:id', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT id, username, email, bio, created_at FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 2. Películas
// Listar
app.get('/api/movies', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM movies ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener películas' });
    }
});

// Detalle
app.get('/api/movies/:id', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Película no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener detalles' });
    }
});


// 3. Reseñas
// Listar por película
app.get('/api/reviews/:movieId', async (req, res) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.movie_id = ? AND r.is_public = 1 ORDER BY r.created_at DESC`,
            [req.params.movieId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
});

// Agregar reseña
app.post('/api/reviews', async (req, res) => {
    try {
        const { user_id, movie_id, title, rating, comment, is_public, contains_spoilers, would_recommend } = req.body;
        const [result] = await connection.promise().query(
            'INSERT INTO reviews (user_id, movie_id, title, rating, comment, is_public, contains_spoilers, would_recommend) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, movie_id, title, rating, comment, (is_public ?? 1), (contains_spoilers ?? 0), (would_recommend ?? 1)]
        );
        res.status(201).json({ message: 'Reseña agregada', reviewId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar reseña' });
    }
});

// Reseñas por usuario
app.get('/api/users/:id/reviews', async (req, res) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT r.*, m.title as movie_title FROM reviews r JOIN movies m ON r.movie_id = m.id WHERE r.user_id = ? ORDER BY r.created_at DESC`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Watchlists

// Crear
app.post('/api/watchlists', async (req, res) => {
    try {
        const { user_id, name, description, is_public, category, priority, target_date } = req.body;
        const [result] = await connection.promise().query(
            `INSERT INTO watchlists (user_id, name, description, is_public, category, priority, target_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, description, is_public, category, priority, target_date]
        );
        res.status(201).json({ message: 'Watchlist creada', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear watchlist' });
    }
});

// Listar por Usuario
app.get('/api/watchlists', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id) return res.status(400).json({ error: 'Falta user_id' });

        const [rows] = await connection.promise().query('SELECT * FROM watchlists WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener watchlists' });
    }
});

// Obtener detalle de una Watchlist
app.get('/api/watchlists/:id', async (req, res) => {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM watchlists WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Watchlist no encontrada' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener watchlist' });
    }
});

// Obtener películas de una Watchlist
app.get('/api/watchlists/:id/movies', async (req, res) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT m.*, wm.added_at 
             FROM movies m 
             JOIN watchlist_movies wm ON m.id = wm.movie_id 
             WHERE wm.watchlist_id = ? 
             ORDER BY wm.added_at DESC`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener películas de la watchlist' });
    }
});

// Agregar Película a Watchlist
app.post('/api/watchlists/:id/movies', async (req, res) => {
    try {
        const { movie_id } = req.body;
        const watchlist_id = req.params.id;

        await connection.promise().query(
            `INSERT IGNORE INTO watchlist_movies (watchlist_id, movie_id) VALUES (?, ?)`,
            [watchlist_id, movie_id]
        );
        res.json({ message: 'Película agregada a la watchlist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar película' });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log("My port is working on " + port);
});
