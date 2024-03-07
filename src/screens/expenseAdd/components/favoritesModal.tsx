import React, {useEffect, useState} from 'react';
import {style} from './style';
import {TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Slider} from '@miblanchard/react-native-slider';
import {SelectList} from 'react-native-dropdown-select-list';

interface modalInterface {
  setValues: any;
  values: any;
  setmoneySplit: any;
  totalSpend: any;
  setVisible: any;
}
const FavoritesModal = ({
  setValues,
  values,
  setmoneySplit,
  totalSpend,
  setVisible,
}: modalInterface) => {
  const peopleDummyData = [
    {value: 'vishnu', key: 1},
    {value: 'bhavya', key: 2},
    {value: 'nadish', key: 3},
  ];
  const [payedUser, setpayedUserValue] = useState(peopleDummyData[0].value);
  const [moneySplitted, setmoneySplitted] = useState([]);

  const updateValue = (index: number, newValue: any) => {
    setValues((prevValues: any[]) => {
      const newValues = [...prevValues]; // Create a copy of the state array

      // Update value at the specified index
      if (!isNaN(newValue)) {
        newValues[index] = Math.floor(newValue * 100);
      } else {
        newValues[index] = Math.floor(0);
      }

      // Convert the array to an object with names as keys and values as values
      const updatedValues = newValues.reduce((acc, val, idx) => {
        acc[peopleDummyData[idx].value] = val;
        return acc;
      }, {});

      // setmoneySplit((prevValues: any) => [...prevValues, updatedValues]);
      setmoneySplitted(updatedValues);
      return newValues; // Return the updated array
    });
  };

  const handleTextInputChange = (text: any, index: number) => {
    const numericValue = parseFloat(text) / 100;
    updateValue(index, numericValue);
  };

  const onPayedBy = (value: any) => {
    if (value === 1) {
      setpayedUserValue(peopleDummyData[0].value);
    } else {
      setpayedUserValue(value);
    }
  };

  const updatePercentages = (percentages: any): any => {
    const updatedPercentages: any = {};

    for (const name in percentages) {
      if (name === payedUser) {
        updatedPercentages[name] = totalSpend * (percentages[name] / 100);
      } else {
        updatedPercentages[name] = 0 - totalSpend * (percentages[name] / 100);
      }
    }
    return updatedPercentages;
  };

  const onSubmit = () => {
    const updatedValues = updatePercentages(moneySplitted);
    setmoneySplit({...updatedValues, payedBy: payedUser});
    setVisible(false);
  };

  return (
    <View style={style.container}>
      <SelectList
        setSelected={(val: any) => {
          onPayedBy(val);
        }}
        defaultOption={peopleDummyData[0]}
        data={peopleDummyData}
        save="value"
      />
      {peopleDummyData.map((res, index) => (
        <View key={index}>
          <Text>{res.value}</Text>
          <Slider
            value={values[index] / 100}
            onValueChange={value => updateValue(index, value)}
          />
          <TextInput
            value={Math.floor(values[index]).toString()} // Display as integer in TextInput
            onChangeText={text => handleTextInputChange(text, index)}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Button
        onPress={onSubmit}
        icon="camera"
        mode="contained"
        disabled={
          values.flat().reduce((acc: any, value: any) => acc + value, 0) !== 100
        }>
        Save
      </Button>
    </View>
  );
};

export default FavoritesModal;
