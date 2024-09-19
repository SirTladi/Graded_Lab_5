import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../FireBase'; 
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'; 

export default function EditFlashCard({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState('');
  const [color, setColor] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'flashcards', id), (doc) => {
      const data = doc.data();
      if (data) {
        setTitle(data.title);
        setTasks(data.tasks);
        setColor(data.color);
        setDueDate(data.dueDate);
      }
    });
    return () => unsubscribe();
  }, [id]);

  const updateFlashcard = async () => {
    try {
      const cardDoc = doc(db, 'flashcards', id);
      await updateDoc(cardDoc, {
        title,
        tasks,
        color,
        dueDate,
      });
      navigation.goBack(); 
    } catch (error) {
      console.error('Error updating flashcard: ', error);
    }
  };

  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6']; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Flashcard</Text>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Tasks:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter tasks"
        value={tasks}
        onChangeText={setTasks}
        multiline
      />
      <Text style={styles.label}>Color:</Text>
      <View style={styles.colorOptions}>
        {colors.map((colorOption, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorButton, { backgroundColor: colorOption }]}
            onPress={() => setColor(colorOption)}
          />
        ))}
      </View>
      <View style={[styles.colorPreview, { backgroundColor: color || '#fff' }]} />
      <Text style={styles.label}>Due Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter due date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <TouchableOpacity style={styles.button} onPress={updateFlashcard}>
        <Text style={styles.buttonText}>Update Flashcard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorPreview: {
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
