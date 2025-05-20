export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export type NoteResponse = {
  notes: Note[]
}