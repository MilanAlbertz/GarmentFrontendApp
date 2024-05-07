import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Card from './Card';
import { GetGarments } from '../api/getGarments';
import ApiVariables from '../api/ApiVariables';
import { useAppContext } from '../AppContext';

function SwipeView() {
  const [items, setItems] = useState([]);
  const { filterChanged } = useAppContext();

  useEffect(() => {     
    callApi();
  }, []);

  useEffect(() => {     
    callApi();
  }, [filterChanged]);

  const updateSwipes = () => {
    items.shift();
    if(items.length === 1){
      callApi();
    }
 }

  const callApi = () => {
    const type = ApiVariables.type;
    const gender = ApiVariables.gender;
    const tags = ApiVariables.tags;
    GetGarments(type, gender, tags)
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error
      });
  };

  const resetCard = (item) => {
    setItems([item, ...items]);
  };

  return (
    <LinearGradient colors={['#AC8A94', '#F2E4E8']} style={{ flex: 1 }}>
      <View style={styles.centeredContent}>
      {items ? (
        items.length > 0
          ? items.slice().reverse().map((item) => (
            <Card key={item.id} item={item} updateSwipes={updateSwipes} resetCard={() => resetCard(item)} />
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
