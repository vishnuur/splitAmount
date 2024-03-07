import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import {saveAddedData} from '../../redux/reducers/historyReducer';
import {useAppDispatch} from '../../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import ModalComponent from '../../components/Modal';
import FavoritesModal from './components/favoritesModal';

interface FormData {
  title: string;
  description: string;
  amount: string;
}

const peopleDummyData = [{name: 'vishnu'}, {name: 'bhavya'}, {name: 'nadish'}];

const currentUser = {name: 'vishnu'};

const MyComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    amount: '',
  });
  const [selectedValue, setselectedValue] = useState(
    'Payed by you, split half',
  ) as any;
  const [customModalvisible, setcustomModalvisible] = useState(false);
  const initialSliderValues = peopleDummyData.map(() => 0);
  const [values, setValues] = useState(initialSliderValues);
  const [moneySplit, setmoneySplit] = useState({});

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleInputChange = (fieldName: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleBlur = () => {
    if (/^[0-9+\-*/().]*$/.test(formData.amount)) {
      let result = eval(formData.amount);
      if (!isNaN(result)) {
        handleInputChange('amount', result.toString());
      }
    }
  };

  const handleSave = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    }
    setErrors(newErrors);
    getCalculatedSplit();
    if (Object.keys(newErrors).length === 0) {
      const newData = {
        ...formData,
        ...moneySplit,
        date: new Date().toISOString(),
      };
      dispatch(saveAddedData(newData));
    }
    navigation.goBack();
  };
  const getCalculatedSplit = () => {
    let result = 0;
    result = parseInt(formData.amount) / peopleDummyData.length;
    let payedBy = '';
    const group: any = {};
    peopleDummyData.forEach(res => {
      if (selectedValue === 1) {
        group[currentUser.name] = result;
        group[res.name] = 0 - result;
        payedBy = currentUser.name;
      } else {
        if (selectedValue.includes('split half')) {
          if (
            selectedValue.includes(res.name) ||
            selectedValue.includes(currentUser.name)
          ) {
            group[res.name] = result;
            payedBy = res.name;
          } else {
            group[res.name] = 0 - result;
          }
        } else if (selectedValue.includes('owes full')) {
          if (
            selectedValue.includes(res.name) ||
            selectedValue.includes(currentUser.name)
          ) {
            group[res.name] = formData.amount;
            payedBy = res.name;
          } else {
            group[res.name] =
              0 - parseInt(formData.amount) / (peopleDummyData.length - 1);
          }
        }
      }
    });
    const payload = {...group, payedBy};
    setmoneySplit(payload);
  };

  const options = [];

  peopleDummyData.forEach(person => {
    const name = person.name === currentUser.name ? 'You' : person.name;

    options.push({
      key: options.length + 1,
      value: `Payed by ${name}, split half`,
    });

    if (name !== 'You') {
      options.push({
        key: options.length + 1,
        value: `${name} owes full`,
      });
    }
  });

  options.push({
    key: options.length + 1,
    value: `You owe full`,
  });

  return (
    <View>
      <TextInput
        placeholder="Amount"
        value={formData.amount}
        onChangeText={text => handleInputChange('amount', text)}
        onBlur={handleBlur}
        keyboardType="numeric"
      />
      {errors.amount && <Text>{errors.amount}</Text>}
      <TextInput
        placeholder="Title"
        value={formData.title}
        onChangeText={text => handleInputChange('title', text)}
      />
      {errors.title && <Text>{errors.title}</Text>}
      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={text => handleInputChange('description', text)}
      />
      <SelectList
        setSelected={(val: any) => {
          setselectedValue(val);
        }}
        defaultOption={{key: 1, value: 'Payed by you, split half'}}
        data={options}
        save="value"
      />
      <Text>OR</Text>
      <TouchableOpacity onPress={() => setcustomModalvisible(true)}>
        <Text>Use Custom</Text>
      </TouchableOpacity>
      <Button
        title="Save"
        onPress={handleSave}
        disabled={!formData.title || !formData.amount}
      />
      {customModalvisible ? (
        <ModalComponent
          visible={customModalvisible}
          handleModalOutsidePress={() => setcustomModalvisible(false)}>
          <FavoritesModal
            setVisible={setcustomModalvisible}
            setValues={setValues}
            values={values}
            setmoneySplit={setmoneySplit}
            totalSpend={formData.amount}
          />
        </ModalComponent>
      ) : null}
    </View>
  );
};

export default MyComponent;
