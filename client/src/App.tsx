import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState<string>("");

  const handleCreateClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
    }).catch((err) => {
      console.error("Error: ", err);
    });
  };

  return (
    <div className="App">
      <main className="h-screen bg-neutral-900 flex flex-col justify-center items-center ">
        <h1 className="text-3xl text-gray-100">{title}</h1>
        <form className="flex flex-col items-center p-8">
          <div className="flex flec-row">
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
