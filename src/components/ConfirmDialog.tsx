import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '../theme/theme';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View
        style={[
          styles.backdrop,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onCancel}
          accessibilityLabel="Cerrar diálogo"
        />

        <View style={styles.dialog}>
          <View style={styles.icon}>
            <Ionicons name="trash-outline" size={28} color={colors.danger} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <View style={styles.action}>
              <Pressable
                onPress={onCancel}
                accessibilityRole="button"
                style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}
              >
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </Pressable>
            </View>

            <View style={styles.action}>
              <Pressable
                onPress={onConfirm}
                accessibilityRole="button"
                style={({ pressed }) => [styles.button, styles.confirmButton, pressed && styles.pressed]}
              >
                <Text style={styles.confirmLabel}>{confirmLabel}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 18, 30, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
  action: {
    flex: 1,
  },
  button: {
    borderRadius: radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.primarySoft,
  },
  confirmButton: {
    backgroundColor: colors.danger,
  },
  pressed: {
    opacity: 0.75,
  },
  cancelLabel: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  confirmLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
