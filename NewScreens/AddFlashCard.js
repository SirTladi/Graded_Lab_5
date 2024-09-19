import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../FireBase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import DateTimePicker from '@react-native-community/datetimepicker';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6']; 

export default function AddFlashCard({ navigation }) {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState('');
  const [color, setColor] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addFlashcard = async () => {
    try {
      await addDoc(collection(db, 'flashcards'), {
        title,
        tasks,
        color,
        dueDate,
        status: 'incomplete',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding flashcard: ', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDueDate(formattedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add a New Flashcard</Text>
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
      <Text style={styles.label}>Select Color:</Text>
      <View style={styles.colorContainer}>
        {colors.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.colorBox, { backgroundColor: item }]}
            onPress={() => setColor(item)}
          />
        ))}
      </View>
      <Text style={styles.label}>Due Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Select due date"
          value={dueDate}
          editable={false} // Prevent manual editing
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={addFlashcard}>
        <Text style={styles.buttonText}>Add Flashcard</Text>
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
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
