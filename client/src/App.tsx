import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

import { createDeck } from "./api/createDeck";
import { fetchDecks, DeckProps } from "./api/fetchDecks";
import { deleteDeck } from "./api/deleteDeck";

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<DeckProps[]>([]);
  const [pickerVisible, setPickerVisible] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const colors = [
    { hex: "#991b1b", tailwind_class: "bg-pink-900 hover:bg-pink-800" },
    { hex: "#115e59", tailwind_class: "bg-teal-900 hover:bg-teal-800" },
    { hex: "#1f2937", tailwind_class: "bg-gray-900 hover:bg-gray-800" },
    { hex: "#4f46e5", tailwind_class: "bg-indigo-900 hover:bg-indigo-800" },
    { hex: "#8338ec", tailwind_class: "bg-purple-900 hover:bg-purple-800" },
    { hex: "#f72585", tailwind_class: "bg-neutral-900 hover:bg-neutral-800" },
  ];

  const handleCreateClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (title) {
      const deck = await createDeck(title, selectedColor);
      if (deck) {
        setDecks([...decks, deck]);
      }
    }
    setTitle("");
    setPickerVisible(false);
  };

  const handleDeleteDeck = (id: string) => {
    deleteDeck(id);
    setDecks((prevDecks) => prevDecks.filter((deck) => deck._id !== id));
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
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
              className={`group w-full flex justify-center items-center text-3xl text-neutral-100 p-6 tranistion-all duration-300 hover:transition-all hover:duration-300 ${deck.color} border-2 border-neutral-700 hover:border-2 hover:border-neutral-500 rounded-lg hover:shadow-lg hover:shadow-neutral-800 select-none`}
              key={deck._id}
            >
              <p className="flex justify-center items-center h-full w-full tranistion-colors duration-300 hover:text-red-200 break-all">
                <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
              </p>
              <div className="relative h-full flex justify-end items-start">
                <button
                  className="absolute top-0"
                  onClick={() => handleDeleteDeck(deck._id)}
                >
                  <RiCloseFill className="invisible group-hover:visible transition ease-in-out duration-300 hover:scale-125 hover:fill-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form className="flex flex-col items-center w-1/5">
          <div className="input-box flex flex-col w-full">
            <label
              htmlFor="deck-title"
              className="z-10 text-3xl text-slate-200 mx-2 bg-neutral-900"
            >
              Deck Title
            </label>
            <input
              id="deck-title"
              type="text"
              autoComplete="off"
              value={title}
              className="z-10 border-2 border-transparent rounded-md bg-neutral-600 px-2 focus:outline-none focus:border-neutral-400 text-white text-lg"
              onChange={(e: React.ChangeEvent) => {
                setTitle((e.target as HTMLInputElement).value);
              }}
              onFocus={() => setPickerVisible(true)}
              required={true}
            />
            {pickerVisible && (
              <div className="z-0 relative">
                <div className={`${pickerVisible ? "" : "hidden"}`}>
                  {colors.map((color) => (
                    <button
                      className={`h-10 w-10 gap-4 rounded-md ${color.tailwind_class} border-2 border-neutral-600 hover:border-2 hover:border-gray-300 transition-colors duration-300 hover:transition-colors focus:border-2 focus:border-gray-300 m-2`}
                      key={color.hex}
                      type="button"
                      onClick={(e) => handleColorChange(color.tailwind_class)}
                    ></button>
                  ))}
                </div>
              </div>
            )}
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
