import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import {style} from './style';
import {TouchableOpacity, View} from 'react-native';

interface modalInterface {
  visible: boolean;
  handleModalOutsidePress: () => void;
  onSave: (groupName: string, userName: string) => void;
}
const ModalComponent = ({
  handleModalOutsidePress,
  visible,
  onSave,
}: modalInterface) => {
  const [groupName, setgroupName] = useState('');
  const [username, setusername] = useState('');
  return (
    <Modal
      visible={visible}
      onDismiss={handleModalOutsidePress}
      contentContainerStyle={style.container}>
      <View>
        <TextInput
          placeholder="Group name"
          onChangeText={text => setgroupName(text)}></TextInput>
        <TextInput
          placeholder="User name"
          onChangeText={text => setusername(text)}></TextInput>
        {/*<TouchableOpacity>Save</TouchableOpacity>*/}
        <Button
          icon="camera"
          mode="contained"
          onPress={() => onSave(groupName, username)}
          disabled={groupName === ''}>
          Save
        </Button>
      </View>
    </Modal>
  );
};

export default ModalComponent;
