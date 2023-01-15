import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";

import { config } from "dotenv";
config();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.send(createdDeck);
});

app.delete("/decks/:deckid", async (req: Request, res: Response) => {
  const deckId = req.params.deckid;
  const deck = await Deck.findByIdAndDelete(deckId);

  res.json(deck);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on port ${PORT}... \nConnected to MongoDB...`);
    app.listen(PORT);
  })
  .catch((err) => console.log(`Oops, an error occured! Error message: ${err}`));
