import { API_URL } from "./config";

export type DeckProps = {
  _id: string;
  title: string;
};

export const fetchDecks = async (): Promise<DeckProps[]> => {
  const response = await fetch(`${API_URL}/decks`);
  console.log("response: ", response);
  return response.json();
};
