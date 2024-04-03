import React, {useEffect, useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {getHistory, saveAddedData} from '../../redux/reducers/historyReducer';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import ModalComponent from '../../components/Modal';
import FavoritesModal from './components/favoritesModal';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {styles} from './style';
import {Button} from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import {getExpenseTypes} from '../../redux/reducers/generalReducer';
import DropdownComponent from '../../components/CustomDropDown';

interface propsGroup {
  groupData: any;
}
interface FormData {
  title: string;
  description: string;
  amount: string;
}

const peopleDummyData = [{name: 'vishnu'}, {name: 'bhavya'}, {name: 'nadish'}];

const currentUser = {name: 'vishnu'};

const AddExpense = ({groupData}: propsGroup) => {
  const {dismissAll} = useBottomSheetModal();
  const {expenseTypes} = useAppSelector(state => state.general);

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
  const [expenseTypesArray, setexpenseTypesArray] = useState([]);
  const [selectedType, setselectedType] = useState('');

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getExpenseTypes(null));
  }, []);

  const handleChangeExpenseType = (value: any) => {
    setselectedType(value);
  };

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

  const handleSave = async () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    }
    setErrors(newErrors);
    const moneySplitedData = await getCalculatedSplit();
    if (Object.keys(newErrors).length === 0) {
      const newData = {
        ...formData,
        ...moneySplitedData,
        date: new Date().toISOString(),
        expenseType: selectedType,
      };
      const payload = {
        newData,
        id: groupData.id,
      };
      dispatch(saveAddedData(payload));
      dismissAll();
    }
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
    console.log(payload, 'checkboth');
    setmoneySplit(payload);
    return payload;
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

  const imageMap: any = {
    Grocery: require('../../assets/Icons/grocery.jpeg'),
    Gas: require('../../assets/Icons/gas.jpeg'),
    Dining: require('../../assets/Icons/dining.jpeg'),
    Shopping: require('../../assets/Icons/shopping.jpeg'),
    Food: require('../../assets/Icons/delivery.jpeg'),
    Enjoyment: require('../../assets/Icons/fun.jpeg'),
    Others: require('../../assets/Icons/others.jpeg'),
  };
  useEffect(() => {
    const enrichedObjects = expenseTypes.map((obj: any) => {
      const assignedImage = imageMap[obj.title];
      return {...obj, image: assignedImage}; // Spread existing object & add image
    });
    setexpenseTypesArray(enrichedObjects);
  }, []);

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Amount"
        handleChange={text => handleInputChange('amount', text)}
        onBlur={handleBlur}
        keyboardType="numeric"
        value={formData.amount}
        warning={errors.amount}
      />
      <CustomInput
        placeholder="Title"
        handleChange={text => handleInputChange('title', text)}
        value={formData.title}
        warning={errors.title}
      />
      <CustomInput
        placeholder="Description"
        handleChange={text => handleInputChange('description', text)}
        value={formData.description}
      />
      {expenseTypes && (
        <DropdownComponent
          data={expenseTypesArray}
          placeholder="Select a type"
          handleChange={(value: any) => handleChangeExpenseType(value)}
          value={selectedType}
        />
      )}
      <View style={styles.inputContainer}>
        <SelectList
          setSelected={(val: any) => {
            setselectedValue(val);
          }}
          defaultOption={{key: 1, value: 'Payed by you, split half'}}
          data={options}
          save="value"
          boxStyles={styles.dropDownBoxStyle}
          dropdownStyles={styles.dropDownContainerStyle}
          dropdownTextStyles={{color: 'black'}}
          inputStyles={{color: 'black'}}
        />
        <Text style={{color: 'black'}}>OR</Text>
        <TouchableOpacity
          onPress={() => setcustomModalvisible(true)}
          style={styles.customButton}>
          <Text style={{color: 'black'}}>Use Custom</Text>
        </TouchableOpacity>
      </View>
      <Button
        icon="content-save"
        mode="contained"
        onPress={handleSave}
        disabled={!formData.title || !formData.amount}>
        Save
      </Button>

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

export default AddExpense;
