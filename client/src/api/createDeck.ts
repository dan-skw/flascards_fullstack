import { API_URL } from "./config";

export const createDeck = async (title: string, color: string) => {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title, color }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
