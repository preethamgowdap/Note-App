// src/components/Card.tsx
import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Note } from '../types';

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export default function MynoteCard({ note, onEdit, onDelete }: Props) {
  const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(menuEl);
  const letter = note.title?.trim().charAt(0).toUpperCase() || '?';

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setMenuEl(e.currentTarget);
  const handleMenuClose = () => setMenuEl(null);

  return (
    <Card 
  sx={{
    border: '2px solid #0c1218',   
    borderRadius: 2,               
  }}
>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor:'purple' }}>{letter}</Avatar>}
        title={note.title}                    
        subheader={note.category}
        action={
          <>
            <IconButton aria-label="more" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={menuEl} open={open} onClose={handleMenuClose}>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onEdit(note);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onDelete(note.id);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        <Typography variant="body1">{note.body}</Typography> {/* description = notes */}
      </CardContent>
    </Card>
  );
}