import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Header from './src/Header';
import SwipeView from './src/SwipeView';
import Footer from './src/Footer';
import { View } from 'react-native';
import LikedView from './src/LikedView';
import ProfileView from './src/ProfileView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CardDetailView from './src/CardDetailView';
import LoginView from './src/LoginView';
import {onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import firebase from 'firebase/app'
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const InsideStack = createStackNavigator();

function InsideLayout() {
  return(
    <InsideStack.Navigator 
    screenOptions={{
      header: (props) => <Header/>, // Custom Header component
    }}>
      <InsideStack.Screen name="SwipeView" component={SwipeView} />
      <InsideStack.Screen name="LikedView" component={LikedView} />
      <InsideStack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen
            name="CardDetailView"
            component={CardDetailView}
            options={{
              cardStyleInterpolator: ({ current: { progress }, layouts }) => ({
                cardStyle: {
                  transform: [
                    {
                      translateY: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                      }),
                    },
                  ],
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
              }),
              animationEnabled: true,
              animationTypeForReplace: 'pop',
            }}
          />
        </InsideStack.Navigator>
  )
}

function App() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, []);
  const [activePage, setActivePage] = useState('SwipeView');
  return (
    <View style={{ flex: 1 }}>
  <NavigationContainer>
    {/* Stack Navigator and other screens */}
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="LoginView" component={LoginView} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>

    {/* Footer should be a descendant of NavigationContainer */}
    {user ? (
      <View style={styles.footerContainer}>
        <Footer activePage={activePage} setActivePage={setActivePage} />
      </View>
    ) : null}
  </NavigationContainer>
</View>

  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position:'relative',
    bottom: 0,
    width: '100%',
  },
});

export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}
