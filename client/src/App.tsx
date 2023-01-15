import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

import { createDeck } from "./api/createDeck";
import { fetchDecks, DeckProps } from "./api/fetchDecks";
import { deleteDeck } from "./api/deleteDeck";
import { createPortal, render } from "react-dom";

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<DeckProps[]>([]);

  const handleCreateClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title) {
      const deck = await createDeck(title);
      if (deck) {
        setDecks([...decks, deck]);
      }
    }
    setTitle("");
  };

  const handleDeleteDeck = (id: string) => {
    deleteDeck(id);
    setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== id));
  };

  useEffect(() => {
    const getDecks = async () => {
      const decksFromServer = await fetchDecks();
      setDecks(decksFromServer);
    };

    getDecks();
  }, []);

  return (
    <div className="App h-screen">
      <main className="h-full bg-neutral-900 flex flex-col gap-8 justify-center items-center ">
        <ul className="grid grid-cols-3 gap-8 w-1/2 justify-items-center">
          {decks.map((deck) => (
            <li
              className="group w-full flex justify-center items-center text-3xl text-neutral-100 h-48 p-6 tranistion-all duration-300 hover:transition-all hover:duration-300 bg-neutral-800 border-2 border-neutral-700 hover:border-2 hover:border-neutral-500 rounded-lg shadow-lg hover:shadow-neutral-800 select-none"
              key={deck._id}
            >
              <p className="flex justify-center items-center h-full w-full tranistion-colors duration-300 hover:text-red-200">
                <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
              </p>
              <div className="h-full flex justify-end items-start">
                <button
                  className="absolute"
                  onClick={() => handleDeleteDeck(deck._id)}
                >
                  <RiCloseFill className="invisible group-hover:visible transition ease-in-out duration-300 hover:scale-125 hover:fill-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form className="flex flex-col items-center">
          <div className="input-box flex">
            <label
              htmlFor="deck-title"
              className="text-3xl text-slate-200 mx-2"
            >
              Deck Title
            </label>
            <input
              id="deck-title"
              type="text"
              autoComplete="off"
              value={title}
              className="border-2 border-transparent rounded-md bg-neutral-600 px-2 focus:outline-none focus:border-neutral-400 text-white text-lg"
              onChange={(e: React.ChangeEvent) => {
                setTitle((e.target as HTMLInputElement).value);
              }}
              required={true}
            />
          </div>
          <button
            className="w-1/2 bg-neutral-700 text-gray-100 text-2xl rounded-lg border-2 border-transparent p-2 mt-4 hover:border-2 hover:border-gray-300 transition-colors duration-300 hover:transition-colors"
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              handleCreateClick(e)
            }
          >
            Create Deck
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
