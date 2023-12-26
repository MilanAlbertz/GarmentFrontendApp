import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface FooterProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const Footer: React.FC<FooterProps> = ({ activePage, setActivePage }) => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    setActivePage('SwipeView');
    navigation.navigate('SwipeView' as never);
  };

  const handleHeartPress = () => {
    setActivePage('LikedView');
    navigation.navigate('LikedView' as never);
  };

  const handleProfilePress = () => {
    setActivePage('ProfileView');
    navigation.navigate('ProfileView' as never);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <Ionicons
          name="home"
          size={24}
          color={activePage === 'SwipeView' ? 'yellow' : '#fff'} // Updated comparison here
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHeartPress}>
        <Ionicons
          name="heart"
          size={24}
          color={activePage === 'LikedView' ? 'yellow' : '#fff'} // Updated comparison here
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons
          name="person"
          size={24}
          color={activePage === 'ProfileView' ? 'yellow' : '#fff'} // Color for ProfileView icon
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#202429',
    height: 60,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Footer;
