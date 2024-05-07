import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GetLikedGarments } from '../api/getLikedGarments';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;

function LikedView() {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    // Navigate to the CardDetailView screen
    navigation.navigate('CardDetailView', { item }); // Pass any necessary parameters
  };
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
<TouchableOpacity onPress={() => handleCardPress(item)} style={[styles.card, { height: cardHeight }]}>
        <Image
          source={{ uri: item.imageUrls[0].url || 'default-image-url' }}
          style={styles.image}
        />
      </TouchableOpacity>
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
