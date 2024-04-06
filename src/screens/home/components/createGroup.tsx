import React, {useState} from 'react';
import {Button, FAB, Modal, Text, TextInput} from 'react-native-paper';
import {style} from './style';
import {View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface modalInterface {
  onSave: (groupName: string, userName: string) => void;
}
const CreateGroup = ({onSave}: modalInterface) => {
  const {dismissAll} = useBottomSheetModal();
  const [groupName, setgroupName] = useState('');
  const [username, setusername] = useState('');
  return (
    <View style={style.container}>
      <CustomInput
        handleChange={text => setgroupName(text)}
        placeholder="Group name"
        customStyle={{width: '100%'}}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <CustomInput
          handleChange={text => setusername(text)}
          placeholder="Email"
          customStyle={{width: 270}}
        />
        <TouchableOpacity>
          <FAB
            icon="plus"
            style={{
              width: 42,
              height: 42,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>

      <Button
        icon="content-save"
        mode="contained"
        onPress={() => {
          onSave(groupName, username);
          dismissAll();
        }}
        disabled={groupName === ''}>
        Save
      </Button>
    </View>
  );
};

export default CreateGroup;
