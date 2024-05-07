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
    <View style={{ backgroundColor: '#AC8A94' }}>
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
          <Image
            source={require('../assets/StyleMate.png')}
            style={{ width: 150, height: 40, marginRight: 10 }}
            resizeMode="contain"
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleFilter}>
              <Ionicons name="filter" size={24} color="#fff"/>
            </TouchableOpacity>
            <FilterView isVisible={isFilterVisible} onClose={() => setIsFilterVisible(false)} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
