import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  NotesList: undefined;
  NoteForm: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type NotesListScreenProps = NativeStackScreenProps<RootStackParamList, 'NotesList'>;
export type NoteFormScreenProps = NativeStackScreenProps<RootStackParamList, 'NoteForm'>;
