import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Linking, Dimensions } from 'react-native';
import TinderCard from 'react-tinder-card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Card({ item,  updateSwipes} ) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const cardWidth = screenWidth - 20; // 5 pixels from left and right
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
      paddingBottom: 60,
      position: 'absolute',
    },
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      overflow: 'hidden',
    },
    itemName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center'
    },
    itemImage: {
      width: cardWidth - 40,
      height: cardHeight - 200,
      resizeMode: 'contain',
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
      setCardVisible(false);
    }else {
      setCardVisible(false);
    }
  };

  return (
    <View style={[styles.cardContainer, { transform: [{ translateY: cardTransform }] }]}>
      {cardVisible && (
        <TinderCard
          onPress={() => onCardPress()}
          onSwipe={onSwipe}
        >
          <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
            <Image
              source={{ uri: item.imageUrls[0].url }}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        </TinderCard>
      )}
    </View>
  );
}

export default Card;
