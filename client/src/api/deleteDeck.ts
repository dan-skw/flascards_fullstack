import { API_URL } from "./config";

export const deleteDeck = async (id: string) => {
  fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
  });
};
