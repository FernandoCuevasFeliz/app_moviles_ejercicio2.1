import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import { useNotes } from '../context/NotesContext';
import type { NoteFormScreenProps } from '../navigation/types';
import { colors, radius, spacing } from '../theme/theme';

export default function NoteFormScreen({ navigation }: NoteFormScreenProps) {
  const { addNote } = useNotes();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);

  function handleSave() {
    if (!title.trim()) {
      setTitleError('El título es obligatorio');
      return;
    }

    addNote(title, content);
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.field}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              if (titleError) {
                setTitleError(null);
              }
            }}
            placeholder="Ej. Llamar al dentista"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, titleError ? styles.inputError : null]}
            returnKeyType="next"
          />
          {titleError ? <Text style={styles.error}>{titleError}</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contenido</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Escribe tu nota aquí..."
            placeholderTextColor={colors.textMuted}
            style={[styles.input, styles.textarea]}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.actions}>
          <View style={styles.action}>
            <AppButton
              label="Cancelar"
              variant="secondary"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.action}>
            <AppButton label="Guardar nota" icon="checkmark" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: spacing.md,
    gap: spacing.lg,
    flexGrow: 1,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  textarea: {
    minHeight: 160,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 'auto',
  },
  action: {
    flex: 1,
  },
});
