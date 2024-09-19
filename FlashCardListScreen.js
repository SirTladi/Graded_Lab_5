import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { db } from '../firebase';

export default function FlashcardListScreen({ navigation }) {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('flashcards').onSnapshot(snapshot => {
      const cards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcards(cards);
    });
    return () => unsubscribe();
  }, []);

  const markComplete = (id) => {
    db.collection('flashcards').doc(id).update({ status: 'completed' });
  };

  const renderCard = ({ item }) => (
    <View style={{ padding: 10, marginBottom: 10, backgroundColor: item.color }}>
      <Text>{item.title}</Text>
      <Text>{item.tasks}</Text>
      <Text>Due Date: {item.dueDate}</Text>
      {item.status === 'incomplete' && (
        <>
          <Button title="Mark as Complete" onPress={() => markComplete(item.id)} />
          <Button title="Edit" onPress={() => navigation.navigate('EditFlashcard', { id: item.id })} />
        </>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={flashcards.filter(card => card.status === 'incomplete')}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text>Incomplete Flashcards</Text>}
      />
      <FlatList
        data={flashcards.filter(card => card.status === 'completed')}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text>Completed Flashcards</Text>}
      />
      <Button title="Add Flashcard" onPress={() => navigation.navigate('AddFlashcard')} />
    </View>
  );
}
