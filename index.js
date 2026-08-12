import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import products from './src/routes/productsRoutes.js';
import auth from './src/routes/authRoutes.js';
import users from './src/routes/usersRoutes.js';
import notification from './src/routes/notificationRoutes.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = process.env.URLS_OKEY.split(",");

app.use(cors({
    origin: allowedOrigins,
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

app.use('/products', products);
app.use('/users', users);
app.use('/auth', auth);
app.use('/notification', notification);

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not found',
        message: 'La ruta solicitada no existe'
    });
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: status === 500 ? 'Internal Server Error' : 'Error',
        message: err.message || 'Ocurrió un error inesperado'
    });
});


export default app;
