import express from 'express';
import morgan from 'morgan';
import adminRoutes from './routes/admin.routes.js';
import instrucRoutes from './routes/instruc.routes.js';
import superAdminRoutes from './routes/superadmin.routes.js';
import devRoutes from './routes/dev.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // Dominio de tu cliente (frontend)
  credentials: true,  // Permite compartir cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/clubleones/instructor", instrucRoutes);//instructor
app.use("/clubleones/admin",adminRoutes); //para el admin
app.use("/clubleones/superadmin", superAdminRoutes);//superadmin
app.use("/clubleones/dev", devRoutes);//dev

export default app;
