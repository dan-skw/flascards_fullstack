import { API_URL } from "./config";
import { DeckProps } from "./fetchDecks";

export const createCard = async (
  deckId: string,
  text: string
): Promise<DeckProps> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
