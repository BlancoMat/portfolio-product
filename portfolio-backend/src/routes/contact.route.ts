import { Router } from 'express';
import { postContact } from '../controllers/contact.controller';

export const contactRouter = Router();

contactRouter.post('/', (req, res, next) => {
  postContact(req, res).catch(next);
});
