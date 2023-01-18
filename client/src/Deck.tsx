import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RiCloseFill, RiArrowLeftCircleFill } from "react-icons/ri";

import { fetchDeck } from "./api/fetchDeck";
import { createCard } from "./api/createCard";
import { DeckProps } from "./api/fetchDecks";
import { deleteCard } from "./api/deleteCard";

export const Deck = () => {
  const [text, setText] = useState<string>("");
  const [cards, setCards] = useState<string[]>([]);
  const [deck, setDeck] = useState<DeckProps | undefined>();
  const { deckId } = useParams();

  const handleCreateClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (text) {
      const { cards: serverCards } = await createCard(deckId!, text);
      setCards(serverCards);
    }
    setText("");
  };

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const updatedDeck = await deleteCard(deckId, index);
    console.log(updatedDeck);
    setCards(updatedDeck.cards);
  };

  useEffect(() => {
    const getDeck = async () => {
      if (!deckId) return;
      const newDeck = await fetchDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    };

    getDeck();
  }, [deckId]);

  return (
    <div className="h-screen">
      <Link to="/" className="text-white absolute top-1/2 ml-6">
        <button>
          <RiArrowLeftCircleFill className="h-10 w-10 fill-neutral-600 hover:fill-neutral-300 transition-colors duration-300  " />
        </button>
      </Link>
      <main className="h-full bg-neutral-900 flex flex-col gap-8 justify-center items-center ">
        <h1 className="text-5xl text-neutral-100">{deck?.title}</h1>
        <ul className="grid grid-cols-3 gap-8 w-1/2 justify-items-center">
          {cards.map((card, index) => (
            <li
              className="group w-full h-48 max-h-full flex justify-center items-center text-3xl text-neutral-100 p-6 tranistion-all duration-300 hover:transition-all hover:duration-300 bg-neutral-800 border-2 border-neutral-700 hover:border-2 hover:border-neutral-500 rounded-lg shadow-lg hover:shadow-neutral-800 select-none"
              key={index}
            >
              <p className="flex justify-center items-center h-full w-full tranistion-colors duration-300 hover:text-red-200 break-before-auto">
                {card}
              </p>
              <div className="h-full flex justify-end items-start">
                <button
                  className="absolute"
                  onClick={() => handleDeleteCard(index)}
                >
                  <RiCloseFill className="invisible group-hover:visible transition ease-in-out duration-300 hover:scale-125 hover:fill-red-500 bg-neutral-800 rounded-full hover:bg-neutral-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form className="flex flex-col items-center">
          <div className="input-box flex">
            <label htmlFor="card-text" className="text-3xl text-slate-200 mx-2">
              Card text
            </label>
            <input
              id="card-title"
              type="text"
              autoComplete="off"
              value={text}
              className={`border-2 border-transparent rounded-md bg-neutral-600 px-2 focus:outline-none focus:border-neutral-400 text-white text-lg`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
              }}
              required={true}
              maxLength={100}
            />
          </div>
          <button
            className="w-1/2 bg-neutral-700 text-gray-100 text-2xl rounded-lg border-2 border-transparent p-2 mt-4 hover:border-2 hover:border-gray-300 transition-colors duration-300 hover:transition-colors"
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              handleCreateClick(e)
            }
          >
            Create Card
          </button>
        </form>
      </main>
    </div>
  );
};
