import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GetLikedGarments } from '../api/getLikedGarments';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const screenWidth = Dimensions.get('window').width;

function LikedView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const userID = user.uid;
    GetLikedGarments(userID)
      .then((likedGarments) => {
        setItems(likedGarments);
        console.log(likedGarments);
      })
      .catch((error) => {
        console.error('Error in useEffect:', error.message);
      });
  }, []); // The empty dependency array ensures that this effect runs only once

  const renderCard = ({ item, index }) => {
    const cardHeight = items.length === 1 ? 500 : 250;

    return (
      <View style={[styles.card, { height: cardHeight }]}>
        <Image
          source={{ uri: item.imageUrls[0].url || 'default-image-url' }}
          style={styles.image}
        />
        <Text key={item.id}>{item.name}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#AC8A94', '#F2E4E8']} style={{ flex: 1 }}>
      {items && items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => renderCard(item)}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.container}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={{ color: 'white' }}>No more items to show</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  image: {
    width: '100%',
    height: '100%', // Full height of the card
    borderRadius: 8,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikedView;
