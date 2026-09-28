import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import { colors, radius, spacing } from '../theme/theme';
import type { WelcomeScreenProps } from '../navigation/types';

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Ionicons name="document-text-outline" size={44} color={colors.primary} />
        </View>

        <Text style={styles.appName}>Notas Rápidas</Text>
        <Text style={styles.tagline}>
          Captura tus ideas y pendientes al instante, sin perder tiempo.
        </Text>
      </View>

      <View style={styles.footer}>
        <AppButton
          label="Comenzar"
          icon="play"
          onPress={() => navigation.navigate('NotesList')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  badge: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 320,
  },
  footer: {
    width: '100%',
  },
});
