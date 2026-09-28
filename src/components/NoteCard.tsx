import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '../theme/theme';
import type { Note } from '../types/Note';
import { formatDate, summarize } from '../utils/summary';

type Props = {
  note: Note;
  onDelete: () => void;
};

export default function NoteCard({ note, onDelete }: Props) {
  const summary = summarize(note.content);

  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
          {summary || 'Sin contenido'}
        </Text>
        <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
      </View>

      <Pressable
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel={`Eliminar la nota ${note.title}`}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
      >
        <Ionicons name="trash-outline" size={18} color={colors.danger} />
        <Text style={styles.deleteLabel}>Eliminar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  deleteLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.danger,
  },
  pressed: {
    opacity: 0.6,
  },
});
