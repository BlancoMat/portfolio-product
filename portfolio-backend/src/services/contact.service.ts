import { Resend } from 'resend';
import { prisma } from '../prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactInput {
  nombre: string;
  email: string;
  mensaje: string;
}

export async function saveContactMessage(input: ContactInput) {
  return prisma.contactMessage.create({ data: input });
}

export async function notifyNewContactMessage(input: ContactInput) {
  const to = process.env.CONTACT_EMAIL_TO;
  if (!to) return;

  await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'Portfolio de Mateo <onboarding@resend.dev>',
    to,
    replyTo: input.email,
    subject: `Nuevo mensaje de ${input.nombre} — Portfolio`,
    text: `${input.mensaje}\n\n— ${input.nombre} (${input.email})`,
  });
}
