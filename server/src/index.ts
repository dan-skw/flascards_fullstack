import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck
    .save()
    .catch((err) => console.log(`Oops! ${err}`));
  res.send(createdDeck);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://flashcardsage:isTstUNwLLLo4XxW@cluster0.wgnpns4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Listening on port ${PORT}... \nConnected to MongoDB...`);

    app.listen(PORT);
  });
