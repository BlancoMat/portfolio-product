import { Request, Response } from 'express';
import { z } from 'zod';
import { notifyNewContactMessage, saveContactMessage } from '../services/contact.service';

const contactSchema = z.object({
  nombre: z.string().trim().min(2, 'El nombre es muy corto').max(100),
  email: z.string().trim().email('Email inválido'),
  mensaje: z.string().trim().min(10, 'Contame un poco más').max(2000),
});

export async function postContact(req: Request, res: Response) {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'validation_error',
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const message = await saveContactMessage(parsed.data);
  await notifyNewContactMessage(parsed.data);

  return res.status(201).json({ id: message.id });
}
