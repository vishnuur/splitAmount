import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
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
import {Dropdown} from 'react-native-element-dropdown';

interface propsGroup {
  groupData: any;
}
interface FormData {
  title: string;
  description: string;
  amount: string;
}

const AddExpense = ({groupData}: propsGroup) => {
  const {dismissAll} = useBottomSheetModal();
  const {expenseTypes} = useAppSelector(state => state.general);
  const {currentUser} = useAppSelector(state => state.users);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    amount: '',
  });
  const [selectedValue, setselectedValue] = useState() as any;
  const [customModalvisible, setcustomModalvisible] = useState(false);
  const initialSliderValues = groupData?.users.map(() => 0);
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
        settleUp: false,
      };
      const payload = {
        newData,
        id: groupData._id,
      };
      dispatch(saveAddedData(payload));
      dismissAll();
    }
  };
  const getCalculatedSplit = () => {
    let result = 0;
    result = parseInt(formData.amount) / groupData?.users.length;
    const payedBy = {
      name:
        selectedValue.userId === currentUser._id
          ? currentUser.username
          : selectedValue.user,
      id: selectedValue.userId,
    };
    const group: any = {};
    groupData?.users.forEach((res: any) => {
      if (selectedValue.splitMethod === 1) {
        if (selectedValue.userId === res.id) {
          group[res.name] = result;
        } else {
          group[res.name] = 0 - result;
        }
      } else {
        if (selectedValue.userId === res.id) {
          group[res.name] = formData.amount;
        } else {
          group[res.name] =
            0 - parseInt(formData.amount) / (groupData?.users.length - 1);
        }
      }
    });

    const payload = {...group, payedBy};
    setmoneySplit(payload);
    return payload;
  };

  const options = [];

  groupData?.users.forEach((person: any) => {
    const name =
      person.name === currentUser.username
        ? 'You'
        : person.name.charAt(0).toUpperCase() + person.name.slice(1);

    options.push({
      key: options.length + 1,
      value: `Payed by ${name}, split half`,
      user: name,
      userId: person.id,
      splitMethod: 1,
    });

    if (name !== 'You') {
      options.push({
        key: options.length + 1,
        value: `${name} owes full`,
        user: name,
        userId: person.id,
        splitMethod: 2,
      });
    }
  });

  options.push({
    key: options.length + 1,
    value: `You owe full`,
    user: currentUser.username,
    userId: currentUser._id,
    splitMethod: 2,
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
        {options?.length && (
          <Dropdown
            style={[styles2.dropdown]}
            placeholderStyle={styles2.placeholderStyle}
            selectedTextStyle={styles2.selectedTextStyle}
            inputSearchStyle={styles2.inputSearchStyle}
            iconStyle={styles2.iconStyle}
            itemTextStyle={{color: 'black'}}
            data={options && options}
            maxHeight={300}
            labelField="value"
            valueField="key"
            placeholder={'Select item'}
            searchPlaceholder="Search..."
            value={selectedValue}
            onChange={item => {
              setselectedValue(item);
            }}
          />
        )}
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

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
