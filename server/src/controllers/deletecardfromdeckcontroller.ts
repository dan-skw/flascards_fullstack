import { Request, Response } from "express";
import Deck from "../models/Deck";

export const deleteCardFromDeckController = async (
  req: Request,
  res: Response
) => {
  const deckid = req.params.deckid;
  const cardIndex = req.params.index;
  const deck = await Deck.findById(deckid);

  if (!deck) {
    return res.status(400).json({ message: "Deck not found" });
  }

  deck.cards.splice(parseInt(cardIndex, 10), 1);
  await deck.save();

  res.json(deck);
};
