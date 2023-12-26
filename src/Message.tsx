import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
 
 function Message(){
    return <Text style={styles.centeredText}>Hello World</Text>;
  }

  const styles = StyleSheet.create({
    centeredText: {
      fontSize: 24,
      textAlign: 'center', // Horizontally centers the text
    }
  });

  export default Message;