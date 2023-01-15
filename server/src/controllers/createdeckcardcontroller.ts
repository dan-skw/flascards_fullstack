import { Request, Response } from "express";
import Deck from "../models/Deck";

export const createDeckCardController = async (req: Request, res: Response) => {
  const deckid = req.params.deckid;
  const deck = await Deck.findById(deckid);

  if (!deck) {
    return res.status(400).json({ message: "Deck not found" });
  }
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();

  res.json(deck);
};
