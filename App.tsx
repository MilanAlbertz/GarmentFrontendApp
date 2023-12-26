import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
import Header from './src/Header';
import SwipeView from './src/SwipeView';
import Footer from './src/Footer';
import { View, StyleSheet } from 'react-native';
import LikedView from './src/LikedView';
import ProfileView from './src/ProfileView';

type RootStackParamList = {
  SwipeView: undefined;
  LikedView: undefined;
  ProfileView: undefined;
  // Define other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [activePage, setActivePage] = useState('SwipeView'); // Manage active page state
  const transitionConfig: StackNavigationOptions['transitionSpec'] = {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  };
  const screenOptions: StackNavigationOptions = {
    header: (props) => <Header />,
    cardStyle: { backgroundColor: 'transparent' }, // For smooth animation
    ...transitionConfig,
    cardStyleInterpolator: ({ current, layouts }) => {
      const swipeViewAnimation = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-layouts.screen.width, 0], // Slide in from the right
      });

      const likedViewAnimation = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.width, 0], // Slide in from the right
      });

      const profileViewAnimation = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.width, 0], // Slide in from the right
      });

      return {
        cardStyle: {
          transform: [
            {
              translateX: activePage === 'SwipeView'
                ? swipeViewAnimation
                : activePage === 'LikedView'
                ? likedViewAnimation
                : profileViewAnimation,
            },
          ],
        },
      };
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SwipeView" component={SwipeView} />
        <Stack.Screen name="LikedView" component={LikedView} />
        <Stack.Screen name="ProfileView" component={ProfileView} />
      </Stack.Navigator>
      <Footer activePage={activePage} setActivePage={setActivePage} /> 
    </NavigationContainer>
  );
}

export default App;
