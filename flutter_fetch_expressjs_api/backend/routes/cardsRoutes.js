import express from 'express';
import Card from '../models/cardsModels.js';

const router = express.Router();

router.post('/post-card', async (req, res) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get-cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get-card/:id', async (req, res) => { // busca por name
  const { id } = req.params;

  try {
    const card = await Card.findOne({ name: id });

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/get-card-id/:id', async (req, res) => { // busca por id
  const { id } = req.params;

  try {
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete-card/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/put-card/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
