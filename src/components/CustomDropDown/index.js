import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SelectCountry} from 'react-native-element-dropdown';

const DropdownComponent = ({data, placeholder, handleChange, value}) => {
  const [country, setCountry] = useState('1');

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={value}
      data={data}
      valueField="title"
      labelField="title"
      imageField="image"
      placeholder={placeholder}
      onChange={e => {
        handleChange(e.title);
        setCountry(e.title);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: '#12D4B4',
    borderWidth: 1,
    borderRadius: 13,
    marginTop: 12,
    padding: 12,
  },
  imageStyle: {
    width: 32,
    height: 32,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    color: 'grey',
  },
  iconStyle: {
    width: 32,
    height: 32,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'grey',
  },
});
