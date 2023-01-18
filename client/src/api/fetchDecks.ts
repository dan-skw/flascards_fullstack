import { API_URL } from "./config";

export type DeckProps = {
  _id: string;
  title: string;
  color: string;
  cards: string[];
};

export const fetchDecks = async (): Promise<DeckProps[]> => {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
};
