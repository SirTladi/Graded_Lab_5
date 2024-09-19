import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../FireBase';

export default function FlashCardList({ navigation }) {
  const [flashcards, setFlashcards] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'flashcards'), snapshot => {
      const cards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcards(cards);
    });

    return () => unsubscribe();
  }, []);

  const markComplete = async (id) => {
    try {
      const cardDoc = doc(db, 'flashcards', id);
      await updateDoc(cardDoc, { status: 'completed' });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const renderCard = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.color || '#fff' }]}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>{item.tasks}</Text>
      <Text style={styles.cardText}>Due Date: {item.dueDate}</Text>
      {item.status === 'incomplete' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => markComplete(item.id)}>
            <Text style={styles.buttonText}>Mark as Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={() => navigation.navigate('EditFlashcard', { id: item.id })}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowCompleted(false)}>
          <Text style={styles.toggleButtonText}>Show Incomplete Flashcards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setShowCompleted(true)}>
          <Text style={styles.toggleButtonText}>Show Completed Flashcards</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={flashcards.filter(card => card.status === (showCompleted ? 'completed' : 'incomplete'))}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={styles.header}>
            {showCompleted ? 'Completed Flashcards' : 'Incomplete Flashcards'}
          </Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddFlashcard')}>
        <Text style={styles.addButtonText}>Add Flashcard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
