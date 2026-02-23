export type NoteCategory = 'personal' | 'work' | 'Birthday' | 'todo'  |'other';

export type Note = {
  id: string;
  title: string;
  body: string;
  category: NoteCategory;
};