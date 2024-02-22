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

  const iconSize = 28; // Base size of icons
  const activeIconSize = 32; // Increased size for selected icon
  const iconContainerWidth = 36; // Fixed width for each icon container

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress}>
        <View style={[styles.iconContainer, { width: iconContainerWidth }]}>
          <Ionicons
            name="home"
            size={activePage === 'SwipeView' ? activeIconSize : iconSize}
            color={activePage === 'SwipeView' ? 'yellow' : '#fff'}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHeartPress}>
        <View style={[styles.iconContainer, { width: iconContainerWidth }]}>
          <Ionicons
            name="heart"
            size={activePage === 'LikedView' ? activeIconSize : iconSize}
            color={activePage === 'LikedView' ? 'yellow' : '#fff'}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProfilePress}>
        <View style={[styles.iconContainer, { width: iconContainerWidth }]}>
          <Ionicons
            name="person"
            size={activePage === 'ProfileView' ? activeIconSize : iconSize}
            color={activePage === 'ProfileView' ? 'yellow' : '#fff'}
          />
        </View>
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
  bottom: 0,
  width: '100%',
  zIndex: 2, // Ensure the footer is on top of the content
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Footer;
