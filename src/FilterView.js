import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ApiVariables from '../api/ApiVariables';

function FilterView({ isVisible, onClose }) {
  const [selectedType, setSelectedType] = useState('T-Shirts');
  const [selectedGender, setSelectedGender] = useState('Both');

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const updateAPIVariables  = () => {
    ApiVariables.type = selectedType;
    ApiVariables.gender = selectedGender;
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()} // Close modal on back press
    >
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradientBackground}
      >
<TouchableOpacity onPress={() => {
  updateAPIVariables(selectedType, selectedGender);
  onClose();
}} style={styles.closeButton}>
  <Ionicons name="close" size={24} color="#fff" />
</TouchableOpacity>        
<View style={styles.container}>
          <View style={styles.dropdownContainer}>
            <Text>Select Type:</Text>
            <Picker
    style={styles.picker}
    selectedValue={selectedGender}
    onValueChange={(itemValue, itemIndex) => handleGenderChange(itemValue)}
  >
    <Picker.Item label="T-Shirts" value="T-Shirts" />
  </Picker>          
  </View>
          <View style={styles.dropdownContainer}>
            <Text>Select Gender:</Text>
  <Picker
    style={styles.picker}
    selectedValue={selectedGender}
    onValueChange={(itemValue, itemIndex) => handleGenderChange(itemValue)}
  >
    <Picker.Item label="Men" value="Men" />
    <Picker.Item label="Women" value="Women" />
    <Picker.Item label="Both" value="Both" />
  </Picker>
</View>
          </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  dropdownContainer: {
    marginVertical: 10,
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#444',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentView: {
    marginTop: 20,
    color: '#fff',
  },
  picker: {
    color: 'black',
    width: '100%',
    height: 40,
  }
});

export default FilterView;
