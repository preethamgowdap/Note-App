import React from 'react';
import {
  Box, Button, FormControl, FormControlLabel, FormLabel,
  Radio, RadioGroup, Stack, TextField, Typography,
} from '@mui/material';
import type { Note, NoteCategory } from '../types';

type Props = {
  initialNote?: Note | null;         
  onSaved: (note: Note) => void;
  onError: (msg: string) => void;
};

export default function NoteForm({ initialNote, onSaved, onError }: Props) {
  const isEdit = !!initialNote;

  const [title, setTitle] = React.useState(initialNote?.title ?? '');
  const [body, setBody] = React.useState(initialNote?.body ?? '');
  const [category, setCategory] = React.useState<NoteCategory>(initialNote?.category ?? 'todo');

  
  React.useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setBody(initialNote.body);
      setCategory(initialNote.category);
    } else {
      setTitle('');
      setBody('');
      setCategory('todo');
    }
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim() || !category) {
      onError('Please fill all required fields.');
      return;
    }

    const note: Note = isEdit
      ? {
          ...initialNote!,                       
          title: title.trim(),
          body: body.trim(),
          category,
        }
      : {
          id: crypto.randomUUID(),
          title: title.trim(),
          body: body.trim(),
          category,
        };

    onSaved(note);

    if (!isEdit) {
      // reset only for create
      setTitle(''); setBody(''); setCategory('todo');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: 520 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {isEdit ? 'Edit Note' : 'Create a new Note'}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Notes"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />
        <FormControl>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            row
            value={category}
            onChange={(e) => setCategory(e.target.value as NoteCategory)}
          >
            <FormControlLabel value="todo"     control={<Radio />} label="To Do" />
            <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
            <FormControlLabel value="birthday" control={<Radio />} label="Birthday" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained">
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </Stack>
    </Box>
  );
}