import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { contactRouter } from './routes/contact.route';

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? '').split(',').filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contact', contactRouter);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`portfolio-backend listening on :${port}`));
