import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TinderCard from 'react-tinder-card'
import Card from './Card';
import { GetGarments } from '../api/getGarments';
import ApiVariables from '../api/ApiVariables';

function SwipeView() {
  const [items, setItems] = useState([]);
  const [swipes, setSwipes] = useState(0);
  const rerender = 1;

  useEffect(() => {     
    CallApi();
  }, []);

  const updateSwipes = () => {
    items.shift();
    if(items.length === 2){
      CallApi();
    }
 }

 const CallApi = () => {
  const type = ApiVariables.type;
  const gender = ApiVariables.gender;
  GetGarments(type, gender)
  .then(data => {
      setItems(data);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      // Handle the error
  });
 }

 return (
  <LinearGradient colors={['#AC8A94', '#F2E4E8']} style={{ flex: 1 }}>
    <View style={styles.centeredContent}>
      {items ? (
        items.length > 0
          ? items.slice().reverse().map((item) => (
              <Card key={item.id} item={item} updateSwipes={updateSwipes} />
            ))
          : <Text>No more items to show</Text>
      ) : <Text>No more items to show</Text>}
    </View>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SwipeView;