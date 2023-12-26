import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function FilterView() {
  return (
      <View style={styles.container}>
        {/* Your content within the swipe view */}
        <Text>Your Swipe View Content</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterView;
