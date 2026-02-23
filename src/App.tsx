// src/App.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  CssBaseline,
  Container,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, AddCircle, Save } from '@mui/icons-material';
import MynoteCard from './components/Card';
import NoteForm from './components/NoteForm';
import type { Note } from './types';

type View = 'notes' | 'create';

const App: React.FC = () => {
  const [handleOpen, setHandleOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('notes');  // for create only
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editOpen, setEditOpen] = useState(false);              // dialog open

  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false, message: '', severity: 'success'
  });

  const toggleDrawer = (open: boolean) => () => setHandleOpen(open);

  
  const handleSelect = (view: View) => {                       // Drawer selection
    setActiveView(view);
    setHandleOpen(false);
  };

  
  const handleSaved = (note: Note) => {
    setNotes(prev => {
      const exists = prev.some(n => n.id === note.id);
      return exists ? prev.map(n => (n.id === note.id ? note : n)) : [note, ...prev];
    });

    setToast({ open: true, message: (editingNote ? 'Note updated!' : 'Note saved!'), severity: 'success' });

    if (editingNote) {
    
      setEditOpen(false);
      setEditingNote(null);
    } else {
      setActiveView('notes');
    }
  };

  const handleError = (msg: string) => {
    setToast({ open: true, message: msg, severity: 'error' });
  };

  
  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setEditOpen(true);               
  };

  const handleDelete = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setToast({ open: true, message: 'Note deleted.', severity: 'success' });
  };
{
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(!handleOpen)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">MY NOTES</Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Preetham</Typography>
            <AccountCircle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left-side Drawer */}
      <Drawer
        anchor="left"
        open={handleOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 240, boxSizing: 'border-box', marginTop: '64px',
            backgroundColor: 'primary.main', color: 'white',
          },
        }}
      >
        <MenuList>
          <MenuItem selected={activeView === 'notes'} onClick={() => handleSelect('notes')}>
            <ListItemIcon><Save fontSize="small" sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText>MY NOTES</ListItemText>
          </MenuItem>

          <MenuItem selected={activeView === 'create'} onClick={() => handleSelect('create')}>
            <ListItemIcon><AddCircle fontSize="small" sx={{ color: 'white' }} /></ListItemIcon>
            <ListItemText>Create Note</ListItemText>
          </MenuItem>
        </MenuList>
      </Drawer>

      
      <Toolbar />
      <Container sx={{ py: 3}}>
        {activeView === 'notes' && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>My Notes</Typography>

            {notes.length === 0 ? (
              <Typography >No notes yet. Click “Create Note” to add one.</Typography>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
                {notes.map((n) => (
                  <MynoteCard key={n.id} note={n} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeView === 'create' && (
          <Box>
            <NoteForm onSaved={handleSaved} onError={handleError} />
          </Box>
        )}
      </Container>

     
      <Dialog open={editOpen} onClose={() => { setEditOpen(false); setEditingNote(null); }} fullWidth maxWidth="sm">
        
        <DialogContent sx={{ pt: 2 }}>
          {editingNote && (
            <NoteForm initialNote={editingNote} onSaved={handleSaved} onError={handleError} />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setToast((t) => ({ ...t, open: false }))} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
}
export default App;