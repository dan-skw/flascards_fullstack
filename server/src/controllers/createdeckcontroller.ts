import { Request, Response } from "express";
import Deck from "../models/Deck";

export const createDeckController = async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
    color: req.body.color,
  });
  const createdDeck = await newDeck.save();
  res.send(createdDeck);
};
