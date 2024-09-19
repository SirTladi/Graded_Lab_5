import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashCardList from './NewScreens/FlashCardList';
import AddFlashCard from './NewScreens/AddFlashCard';
import EditFlashCard from './NewScreens/EditFlashCard';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Flashcards">
        <Stack.Screen name="Flashcards" component={FlashCardList} />
        <Stack.Screen name="AddFlashcard" component={AddFlashCard} />
        <Stack.Screen name="EditFlashcard" component={EditFlashCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
