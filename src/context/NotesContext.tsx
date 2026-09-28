import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { loadNotes, persistNotes } from '../storage/notesStorage';
import type { Note } from '../types/Note';

type NotesContextValue = {
  notes: Note[];
  isLoading: boolean;
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    loadNotes()
      .then((stored) => {
        if (active) {
          setNotes(stored);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    persistNotes(notes).catch(() => undefined);
  }, [notes, isLoading]);

  const addNote = useCallback((title: string, content: string) => {
    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      content: content.trim(),
      createdAt: Date.now(),
    };

    setNotes((current) => [note, ...current]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id));
  }, []);

  const value = useMemo(
    () => ({ notes, isLoading, addNote, deleteNote }),
    [notes, isLoading, addNote, deleteNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes(): NotesContextValue {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes debe usarse dentro de NotesProvider');
  }

  return context;
}
