import { NoteType } from "@/types/types";
import axios from "axios";

export const getNotes = async () => {
  const { data } = await axios.get("/api/notes");
  return data;
};
export const createNotes = async (info: NoteType) => {
  const { data } = await axios.post("/api/notes", info);
  return data;
};
export const updateNotes = async (id: string) => {
  const { data } = await axios.put("/api/notes", { id });
  return data;
};
export const deleteNotes = async (id: string) => {
  const { data } = await axios.delete("/api/notes", { data: { id } });
  return data;
};
