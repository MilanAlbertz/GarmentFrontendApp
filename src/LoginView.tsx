import {View, Text, ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, { useState} from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onIdTokenChanged  } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { RegisterUser } from '../api/registerUser';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error:any){
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally{
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);

      await setDoc(doc(FIRESTORE_DB, 'userProfiles', response.user.uid), {
        email: email,
        profileImageURL: '', // Set image to empty string
        username: username, // Set username to empty string
      });
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userID = user.uid;
        RegisterUser(userID);
      } else {
        console.log('No user is currently logged in.');
      }
      
    } catch (error:any){
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally{
      setLoading(false);
    }
  }
  return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.headerImg}
              source={{
                uri: 'https://withfra.me/android-chrome-512x512.png',
              }}
            />

            <Text style={styles.title}>
              Sign in to <Text style={{ color: '#075eec' }}>MyApp</Text>
            </Text>

            <Text style={styles.subtitle}>
              Get access to your portfolio and more
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="user123"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <Button title='Login' onPress={signIn}/>
            <Button title='Create account' onPress={signUp}/>
          </View>
        </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
export default LoginView;