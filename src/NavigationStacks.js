import {createStackNavigator} from '@react-navigation/stack';
import SwipeView from './SwipeView';
import LikedView from './LikedView';
import ProfileView from './ProfileView';
import LoginView from './LoginView';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
<NavigationContainer>
      <Header />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SwipeView" component={SwipeView} />
        <Stack.Screen name="LikedView" component={LikedView} />
        <Stack.Screen name="ProfileView" component={ProfileView} />
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
      </Stack.Navigator>
      <Footer activePage={activePage} setActivePage={setActivePage} />
    </NavigationContainer>  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginView" component={LoginView} />
    </Stack.Navigator>
  );
};

export const Router = () => {
  //More explanations about "authData" below
    return (
      <NavigationContainer>
        {authData ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };