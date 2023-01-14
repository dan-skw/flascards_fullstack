import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

import { config } from "dotenv";
config();

const PORT = 5000;
const app = express();

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.send(createdDeck);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on port ${PORT}... \nConnected to MongoDB...`);
    app.listen(PORT);
  })
  .catch((err) => console.log(`Oops, an error occured! Error message: ${err}`));
