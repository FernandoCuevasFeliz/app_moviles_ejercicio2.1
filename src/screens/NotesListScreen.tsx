import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ConfirmDialog from '../components/ConfirmDialog';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../context/NotesContext';
import type { RootStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme/theme';
import type { Note } from '../types/Note';

type Props = NativeStackScreenProps<RootStackParamList, 'NotesList'>;

export default function NotesListScreen({ navigation }: Props) {
  const { notes, isLoading, deleteNote } = useNotes();
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const insets = useSafeAreaInsets();

  const fabBottom = insets.bottom + spacing.lg;
  const listPaddingBottom = insets.bottom + 96;

  function handleConfirmDelete() {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
    }

    setNoteToDelete(null);
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(note) => note.id}
        contentContainerStyle={[styles.list, { paddingBottom: listPaddingBottom }]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <NoteCard note={item} onDelete={() => setNoteToDelete(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="documents-outline" size={40} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Todavía no hay notas</Text>
            <Text style={styles.emptyText}>
              Pulsa el botón + para escribir tu primera nota rápida.
            </Text>
          </View>
        }
      />

      <Pressable
        onPress={() => navigation.navigate('NoteForm')}
        accessibilityRole="button"
        accessibilityLabel="Agregar nueva nota"
        style={({ pressed }) => [styles.fab, { bottom: fabBottom }, pressed && styles.fabPressed]}
      >
        <Ionicons name="add" size={32} color={colors.white} />
      </Pressable>

      <ConfirmDialog
        visible={noteToDelete !== null}
        title="Eliminar nota"
        message={
          noteToDelete
            ? `¿Seguro que quieres eliminar "${noteToDelete.title}"? Esta acción no se puede deshacer.`
            : ''
        }
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setNoteToDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
    flexGrow: 1,
  },
  separator: {
    height: spacing.sm,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.8,
  },
});
