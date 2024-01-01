import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Header from './src/Header';
import SwipeView from './src/SwipeView';
import Footer from './src/Footer';
import { View, StyleSheet } from 'react-native';
import LikedView from './src/LikedView';
import ProfileView from './src/ProfileView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type RootStackParamList = {
  SwipeView: undefined;
  LikedView: undefined;
  ProfileView: undefined;
  // Define other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [activePage, setActivePage] = useState('SwipeView'); // Manage active page state

  const screenOptions: StackNavigationOptions = {
    headerShown: false, // Hide the default navigator header
    cardStyle: { backgroundColor: 'transparent' }, // For smooth animation
    transitionSpec: {
      open: { animation: 'timing', config: { duration: 300 } },
      close: { animation: 'timing', config: { duration: 300 } },
    },
    cardStyleInterpolator: ({ current, layouts }) => {
      const swipeViewAnimation = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-layouts.screen.width, 0], // Slide in from the left for SwipeView
      });

      const likedProfileViewAnimation = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.width, 0], // Slide in from the right for LikedView and ProfileView
      });

      return {
        cardStyle: {
          transform: [
            {
              translateX: activePage === 'SwipeView'
                ? swipeViewAnimation
                : (activePage === 'LikedView' || activePage === 'ProfileView')
                ? likedProfileViewAnimation
                : 0, // No animation for other pages
            },
          ],
        },
      };
    },
  };

  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SwipeView" component={SwipeView} />
        <Stack.Screen name="LikedView" component={LikedView} />
        <Stack.Screen name="ProfileView" component={ProfileView} />
      </Stack.Navigator>
    <Footer activePage={activePage} setActivePage={setActivePage} />
  </NavigationContainer>
  );
}

export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}