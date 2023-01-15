import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getdeckscontroller";
import { getDeckController } from "./controllers/getdeckcontroller";
import { createDeckController } from "./controllers/createdeckcontroller";
import { deleteDeckController } from "./controllers/deletedeckcontroller";
import { createDeckCardController } from "./controllers/createdeckcardcontroller";
import { deleteCardFromDeckController } from "./controllers/deletecardfromdeckcontroller";

import { config } from "dotenv";

config();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/decks", getDecksController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks", createDeckController);
app.post("/decks/:deckid/cards", createDeckCardController);
app.delete("/decks/:deckid", deleteDeckController);
app.delete("/decks/:deckid/cards/:index", deleteCardFromDeckController);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on port ${PORT}... \nConnected to MongoDB...`);
    app.listen(PORT);
  })
  .catch((err) => console.log(`Oops, an error occured! Error message: ${err}`));
