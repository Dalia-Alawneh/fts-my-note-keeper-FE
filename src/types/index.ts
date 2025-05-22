export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  color?: string;
}

export type NoteResponse = {
  notes: Note[]
}

export type NoteRequestPayload = Omit<Note, '_id' | 'createdAt'>

export interface ApiValidationError {
  message: string;
  fieldErrors?: Record<string, string>;
}