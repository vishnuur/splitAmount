import {View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import {useState} from 'react';
import {Button} from 'react-native-paper';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

interface customProps {
  onConfirmSettleUp: any;
  defaultValue: any;
}

const SettleUp = ({defaultValue, onConfirmSettleUp}: customProps) => {
  const {dismissAll} = useBottomSheetModal();

  console.log(defaultValue, 'defaultValuedefaultValue');
  const [inputValue, setinputValue] = useState(defaultValue.toString());

  return (
    <View>
      <CustomInput
        placeholder="Amount"
        handleChange={text => setinputValue(text)}
        keyboardType="numeric"
        // value={inputValue}
        defaultValue={inputValue}
      />
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => {
          onConfirmSettleUp(inputValue);
          dismissAll();
        }}>
        Save
      </Button>
    </View>
  );
};
export default SettleUp;
