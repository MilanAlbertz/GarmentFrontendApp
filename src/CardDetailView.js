import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

function CardDetailView({ route, navigation }) {
  const { item } = route.params; // Get the item details from the route params

  const onClosePress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.popup}>
        <Ionicons
          name="close"
          size={35}
          color="black"
          onPress={onClosePress}
          style={styles.closeIcon}
        />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {item.imageUrls.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{ uri: image.url }}
                style={styles.itemImage}
              />
            </View>
          ))}
        </ScrollView>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`Price: $${item.price}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 400,
    justifyContent: 'center', // Center the images horizontally
    alignItems: 'center', // Center the images vertically
  },
  itemImage: {
    width: screenWidth - 100,
    height: screenWidth,
    resizeMode: 'cover',
  },
  itemPrice: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CardDetailView;
