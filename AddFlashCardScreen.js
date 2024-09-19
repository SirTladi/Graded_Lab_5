import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { db } from '../firebase';

export default function AddFlashcardScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState('');
  const [color, setColor] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addFlashcard = () => {
    db.collection('flashcards').add({
      title,
      tasks,
      color,
      dueDate,
      status: 'incomplete',
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Tasks:</Text>
      <TextInput value={tasks} onChangeText={setTasks} />
      <Text>Color:</Text>
      <TextInput value={color} onChangeText={setColor} />
      <Text>Due Date:</Text>
      <TextInput value={dueDate} onChangeText={setDueDate} />
      <Button title="Add Flashcard" onPress={addFlashcard} />
    </View>
  );
}
