import cors from 'cors';
import express from 'express';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import healthRouter from './routes/healthRoutes.js';

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const corsError = new Error('CORS policy does not allow this origin.');
      corsError.statusCode = 403;
      return callback(corsError);
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
