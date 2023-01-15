import { API_URL } from "./config";
import { DeckProps } from "./fetchDecks";

export async function fetchDeck(deckId: string): Promise<DeckProps> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
  return response.json();
}
