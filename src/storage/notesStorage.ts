import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Note } from '../types/Note';

const NOTES_KEY = 'notas-rapidas:notes';

export async function loadNotes(): Promise<Note[]> {
  const stored = await AsyncStorage.getItem(NOTES_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as Note[]) : [];
  } catch {
    return [];
  }
}

export async function persistNotes(notes: Note[]): Promise<void> {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}
