import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, getDoc, updateDoc} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';

function ProfileView({ navigation }) {
  const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userProfileRef = doc(FIRESTORE_DB, 'userProfiles', user.uid);
        const userDoc = await getDoc(userProfileRef);
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    useEffect(() => {
      fetchUserData();
  }, []);

  const goToLogin = () => {
    navigation.navigate('LoginView'); // Replace 'LoginView' with the name of your login screen
  };
// Function to update profile picture URL in Firestore
const updateProfilePictureInFirestore = async (imageUrl) => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    const userProfileRef = doc(FIRESTORE_DB, 'userProfiles', user.uid);

    // Update the profile picture URL in Firestore
    await updateDoc(userProfileRef, { profileImageURL
      : imageUrl });
  } catch (error) {
    console.error('Error updating profile picture URL in Firestore:', error);
    throw error;
  }
};

  const uploadProfilePictureToStorage = async (uri) => {
  try {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'profilePictures/' + FIREBASE_AUTH.currentUser.uid);

    // Upload the image blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob); // Use put instead of uploadString

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

  const handleEditProfilePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to your photos to change your profile picture.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const imageUrl = await uploadProfilePictureToStorage(result.assets[0].uri);
        await updateProfilePictureInFirestore(imageUrl);
        fetchUserData();
      }
    } catch (error) {
      console.error('Error selecting profile picture:', error);
    }
  };

  return (
<View style={styles.container}>
    <View style={styles.avatarContainer}>
      <Image
source={
    userData && userData.profileImageURL ? { uri: userData.profileImageURL } : { uri: 'https://www.bootdey.com/img/Content/avatar/avatar6.png' }
  }          style={styles.avatar}
      />
      <TouchableOpacity style={styles.editIconContainer} onPress={handleEditProfilePicture}>
        <AntDesign name="edit" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.name}>{userData ? userData.username : 'Loading...'}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Email:</Text>
      <Text style={styles.infoValue}>{userData ? userData.email : 'Loading...'}</Text>
    </View>
    <View style={styles.infoContainer}>
    <Button title="Logout" color={"#C7B0BC"} onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  </View>  );
}; 

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }, 
  container: {
    flex: 1,
    backgroundColor: '#F2E4E8',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#D6C1C7', // Background color for the edit icon
    borderRadius: 50,
    padding: 5,
  }
});

export default ProfileView;
