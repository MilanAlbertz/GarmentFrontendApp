import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Linking, Dimensions } from 'react-native';
import TinderCard from 'react-tinder-card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LikeGarment } from '../api/likeGarment';
import { FIREBASE_AUTH } from '../FirebaseConfig';

function Card({ item,  updateSwipes} ) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const cardWidth = screenWidth - 40; // 5 pixels from left and right
  const cardHeight = screenHeight - 200; // 10 pixels from top and bottom

  const styles = StyleSheet.create({
    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 5,
      zIndex: item.id,
      paddingBottom: 0,
      position: 'absolute',
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'white',
      padding: 0,
      overflow: 'hidden',
    },
    itemName: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'center'
    },
    itemImage: {
      width: cardWidth - 0,
      height: cardHeight - 0,
      resizeMode: 'cover' ,
    },
  });

  const navigation = useNavigation();
  const [cardTransform, setCardTransform] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  const onSwipe = (direction) => {
    if (direction === 'up') {
      navigation.navigate('CardDetailView', { item });
    } else if (direction === 'down') {
      Linking.openURL(item.siteUrl)
        .catch((err) => console.error('An error occurred', err));
    } else if (direction === 'left') {
      setCardVisible(false);
      updateSwipes();
    } else if (direction === 'right') {
      updateSwipes();
      const user = FIREBASE_AUTH.currentUser;
      const userID = user.uid;
      LikeGarment(item.id, userID);
      setCardVisible(false);
    }else {
      setCardVisible(false);
    }
  };

  return (
    <View style={[styles.cardContainer, { transform: [{ translateY: cardTransform }] }]}>
      {cardVisible && (
        <TinderCard
          onSwipe={onSwipe}
        >
          <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
            <Image
              source={{ uri: item.imageUrls[0].url }}
              style={styles.itemImage}
            />

          </View>
        </TinderCard>
      )}
    </View>
  );
}

export default Card;
