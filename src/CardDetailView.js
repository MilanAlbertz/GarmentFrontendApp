import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

function CardDetailView({ route, navigation }) {
  const { item } = route.params; // Get the item details from the route params
  const [activeIndex, setActiveIndex] = useState(0);

  const onClosePress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
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
        <View style={styles.lineContainer}>
          {item.imageUrls.map((_, index) => (
            <View
              key={index}
              style={[
                styles.line,
                index === activeIndex ? styles.activeLine : null,
              ]}
            />
          ))}
        </View>
        <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E4E8',
  },
  popup: {
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
    zIndex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    justifyContent: 'center', // Center the images horizontally
    alignItems: 'center', // Center the images vertically
  },
  itemImage: {
    width: screenWidth,
    height: screenWidth + 100,
    resizeMode: 'cover',
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  line: {
    height: 4,
    backgroundColor: 'white',
    flex: 1, 
    marginHorizontal: 5,
  },
  activeLine: {
    backgroundColor: 'black',
  },
});

export default CardDetailView;
