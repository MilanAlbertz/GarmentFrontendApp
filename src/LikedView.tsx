import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LikedView() {
  return (
    <LinearGradient colors={['#424242', '#A20000']} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Your content within the swipe view */}
        <Text>Your Like View Content</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikedView;
