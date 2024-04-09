import { NoteType } from "@/types/types";
import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  fullfilled: { type: Boolean, default: false },
});

const Note = models.Note || model<NoteType>("Note", noteSchema);

export default Note;
