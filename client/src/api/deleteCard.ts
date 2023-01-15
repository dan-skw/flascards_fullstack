import { API_URL } from "./config";
import { DeckProps } from "./fetchDecks";

export const deleteCard = async (
  deckId: string,
  index: number
): Promise<DeckProps> => {
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
  return response.json();
};
