# portfolio-backend

Backend del formulario de contacto de [portfolio-frontend](../portfolio-frontend). Express + TypeScript + Prisma + PostgreSQL (Supabase), con notificación por email vía Resend.

## Setup

1. **Base de datos (Supabase)**
   - Creá un proyecto en [supabase.com](https://supabase.com).
   - Andá a *Settings → Database → Connection string → URI* y copiala.

2. **Email (Resend)**
   - Creá una cuenta en [resend.com](https://resend.com) y generá una API key.
   - Mientras no verifiques un dominio propio, se puede enviar desde `onboarding@resend.dev` (remitente de pruebas de Resend).

3. **Variables de entorno**
   ```bash
   cp .env.example .env
   # completar DATABASE_URL, RESEND_API_KEY, CONTACT_EMAIL_TO
   ```

4. **Instalar y migrar**
   ```bash
   npm install
   npm run prisma:migrate   # crea la tabla contact_messages en Supabase
   ```

5. **Correr en desarrollo**
   ```bash
   npm run dev   # http://localhost:3000
   ```

## Endpoints

- `GET /health` — chequeo de que el servidor está vivo.
- `POST /api/contact` — `{ nombre, email, mensaje }` → guarda el mensaje y envía el aviso por email.

## Deploy (Render)

1. Nuevo *Web Service* apuntando a este repo/carpeta.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Cargar las mismas variables de entorno del `.env` (con `FRONTEND_ORIGIN` apuntando al dominio real del portfolio en producción).
