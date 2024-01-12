import React, { useState } from 'react';
import { View, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FilterView from './FilterView';

const Header = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <View style={{ backgroundColor: '#202429' }}>
      <StatusBar backgroundColor="#202429" barStyle="light-content" />
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            paddingHorizontal: 20,
            zIndex: 1
          }}
        >
          {/* Logo */}
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 150, height: 40, marginRight: 10 }}
            resizeMode="contain"
          />

          {/* Icons */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Notifications Icon */}
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Filter Icon */}
            <TouchableOpacity>
              <Ionicons name="filter" size={24} color="#fff" onPress={toggleFilter}/>
            </TouchableOpacity>
            <FilterView isVisible={isFilterVisible} onClose={() => setIsFilterVisible(false)} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
