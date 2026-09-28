import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoteFormScreen from '../screens/NoteFormScreen';
import NotesListScreen from '../screens/NotesListScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { colors } from '../theme/theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="NotesList"
        component={NotesListScreen}
        options={{ title: 'Mis notas' }}
      />
      <Stack.Screen
        name="NoteForm"
        component={NoteFormScreen}
        options={{ title: 'Nueva nota' }}
      />
    </Stack.Navigator>
  );
}
