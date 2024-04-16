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
        <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
        <Text style={styles.title}>{item.name}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E4E8',
  },
  popup: {
    display: 'flex',
    backgroundColor: '#F2E4E8',
    padding: 0,
    borderRadius: 0,

  },
  title: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 25,
    padding: 20,
    textAlign: 'left',
    fontWeight: 'bold',
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
    width: screenWidth,
    height: screenWidth + 200,
    resizeMode: 'cover',
  },

});

export default CardDetailView;
