import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ApiVariables from '../api/ApiVariables';
import RNPickerSelect from 'react-native-picker-select';
import BouncyCheckbox from "react-native-bouncy-checkbox";

function FilterView({ isVisible, onClose }) {
  const { handleFilterChange } = useAppContext();
  const [selectedType, setSelectedType] = useState('T-Shirts');
  const [selectedGender, setSelectedGender] = useState('Both');
  const [selectedTags, setSelectedTags] = useState(['print']);

  const handleChange = (type, value) => {
    switch (type) {
      case 'type':
        setSelectedType(value);
        break;
      case 'gender':
        setSelectedGender(value);
        break;
    }
  };

  const updateAPIVariables = () => {
    ApiVariables.type = selectedType;
    ApiVariables.gender = selectedGender;
    ApiVariables.tags = selectedTags;
  };

  const handleClose = () => {
    updateAPIVariables(selectedType, selectedGender, selectedTags);
    handleFilterChange(); // Call handleFilterChange from context
    onClose();
  };

  const customPickerStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose()} // Close modal on back press
    >
      <LinearGradient
        colors={['#AC8A94', '#F2E4E8']}
        style={styles.gradientBackground}
      >
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.dropdownContainer}>
            <Text>Select Type:</Text>
            <RNPickerSelect
              style={customPickerStyles}
              placeholder={{ label: 'T-Shirts', value: 'T-Shirts' }}
              items={[
              ]}
              onValueChange={(value) => handleChange("type", value)}
              value={selectedType}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text>Select Gender:</Text>
            <RNPickerSelect
              style={customPickerStyles}
              placeholder={{ label: 'Both', value: 'Both' }}
              items={[
                { label: 'Men', value: 'Men' },
                { label: 'Women', value: 'Women' },
              ]}
              onValueChange={(value) => handleChange("gender", value)}
              value={selectedGender}
            />
          </View>
          <View style={styles.checkboxContainer}>
  <Text>Select Tags:</Text>
  <View style={styles.checkboxItem}>
    <BouncyCheckbox
      isChecked={selectedTags.includes('print')} // Ensure proper prop name
      onPress={() =>
        setSelectedTags(
          selectedTags.includes('print')
            ? selectedTags.filter(tag => tag !== 'print')
            : [...selectedTags, 'print']
        )
      }
    />
    <Text>print</Text>
  </View>
  <View style={styles.checkboxItem}>
    <BouncyCheckbox
      isChecked={selectedTags.includes('test')} // Ensure proper prop name
      onPress={() =>
        setSelectedTags(
          selectedTags.includes('test')
            ? selectedTags.filter(tag => tag !== 'test')
            : [...selectedTags, 'test']
        )
      }
    />
    <Text>test</Text>
  </View>
  <View style={styles.checkboxItem}>
    <BouncyCheckbox
      isChecked={selectedTags.includes('tester')} // Ensure proper prop name
      onPress={() =>
        setSelectedTags(
          selectedTags.includes('tester')
            ? selectedTags.filter(tag => tag !== 'tester')
            : [...selectedTags, 'tester']
        )
      }
    />
    <Text>tester</Text>
  </View>
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
    width: '90%',
    backgroundColor: '#F2E4E8',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
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
  },
  checkboxContainer: {
    marginTop: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FilterView;
