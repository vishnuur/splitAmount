import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import {style} from './style';
import {View} from 'react-native';

interface modalInterface {
  onSave: (groupName: string, userName: string) => void;
}
const CreateGroup = ({onSave}: modalInterface) => {
  const [groupName, setgroupName] = useState('');
  const [username, setusername] = useState('');
  return (
    <View style={style.container}>
      <TextInput
        placeholder="Group name"
        onChangeText={text => setgroupName(text)}></TextInput>
      <TextInput
        placeholder="User name"
        onChangeText={text => setusername(text)}></TextInput>
      {/*<TouchableOpacity>Save</TouchableOpacity>*/}
      <Button
        icon="content-save"
        mode="contained"
        onPress={() => onSave(groupName, username)}
        disabled={groupName === ''}>
        Save
      </Button>
    </View>
  );
};

export default CreateGroup;
