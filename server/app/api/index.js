import { Router } from 'express';
import { createItem, getItems } from '../../../database/items/item';

const api = Router();

api
  .route('/items')
  .get(async (req, res) => {
    const items = await getItems();
    res.status(200).send({ items });
  })
  .post(async (req, res) => {
    const { name, vendor, teir, costs } = req.body;
    await createItem(name, vendor, teir, costs);
    res.sendStatus(201);
  });

export default api;
