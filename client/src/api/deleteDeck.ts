import { API_URL } from "./config";

export const deleteDeck = async (id: string) => {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).catch((err) => {
    console.error(`Error: ${err}`);
  });
};
