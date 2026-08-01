import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import productsRouter from './src/routes/productsRoutes.js';
import authRouter from './src/routes/authRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: [`http://localhost:${PORT}`, 'https://node-agus-com.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use('/api/products', productsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not found',
        message: 'La ruta solicitada no existe'
    });
});

app.use((err, req, res, next) => {
    const status = err.status || 500;

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token inválido o ausente' });
    }

    res.status(status).json({
        error: status === 500 ? 'Internal Server Error' : 'Error',
        message: err.message || 'Ocurrió un error inesperado'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
