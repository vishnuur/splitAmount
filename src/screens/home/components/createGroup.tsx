import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import {style} from './style';
import {View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

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
      />
      <CustomInput
        handleChange={text => setusername(text)}
        placeholder="Email"
      />

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
