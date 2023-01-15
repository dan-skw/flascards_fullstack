import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getdeckscontroller";
import { createDeckController } from "./controllers/createdeckcontroller";
import { deleteDeckController } from "./controllers/deletedeckcontroller";

import { config } from "dotenv";

config();

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/decks", getDecksController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckid", deleteDeckController);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`Listening on port ${PORT}... \nConnected to MongoDB...`);
    app.listen(PORT);
  })
  .catch((err) => console.log(`Oops, an error occured! Error message: ${err}`));
