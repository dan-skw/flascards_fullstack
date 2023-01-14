import React, { useEffect, useState } from "react";

type DeckProps = {
  _id: string;
  title: string;
}[];

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<DeckProps>([]);

  const handleCreateClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.error(`Error: ${err}`);
    });
  };

  useEffect(() => {
    const fetchDecks = async () => {
      await fetch("http://localhost:5000/decks")
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          setDecks(data);
        })
        .catch((err) => {
          throw new Error(
            `Network response was not ok. ${err.status} : ${err.statusText}`
          );
        });
    };

    fetchDecks();
  }, []);

  return (
    <div className="App">
      <main className="h-screen bg-neutral-900 flex flex-col gap-8 justify-center items-center ">
        <ul className="grid grid-cols-3 gap-8 w-1/2 justify-items-center">
          {decks.map((deck) => (
            <li
              className="flex justify-center items-center text-3xl text-neutral-100 h-48 p-6 w-full tranistion-all duration-300 hover:transition-all hover:duration-300 bg-neutral-800 border-2 border-neutral-700 hover:border-2 hover:border-neutral-500 rounded-lg shadow-lg hover:shadow-neutral-800 select-none"
              key={deck._id}
            >
              {deck.title}
            </li>
          ))}
        </ul>
        <h1 className="text-3xl text-gray-100">{title}</h1>
        <form className="flex flex-col items-center">
          <div className="flex">
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
