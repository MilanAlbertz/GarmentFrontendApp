import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH } from '../FirebaseConfig';

function ProfileView({ navigation }) {
  const goToLogin = () => {
    navigation.navigate('LoginView'); // Replace 'LoginView' with the name of your login screen
  };

  return (
    <LinearGradient colors={['#424242', '#A20000']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileView;
