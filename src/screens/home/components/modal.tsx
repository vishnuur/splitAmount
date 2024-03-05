import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from 'react-native-paper';
import {style} from './style';
import {TouchableOpacity, View} from 'react-native';

interface modalInterface {
  visible: boolean;
  handleModalOutsidePress: () => void;
  onSave: (value: string) => void;
}
const ModalComponent = ({
  handleModalOutsidePress,
  visible,
  onSave,
}: modalInterface) => {
  const [groupName, setgroupName] = useState('');
  return (
    <Modal
      visible={visible}
      onDismiss={handleModalOutsidePress}
      contentContainerStyle={style.container}>
      <View>
        <TextInput
          placeholder="Group name"
          onChangeText={text => setgroupName(text)}></TextInput>
        {/*<TouchableOpacity>Save</TouchableOpacity>*/}
        <Button
          icon="camera"
          mode="contained"
          onPress={() => onSave(groupName)}
          disabled={groupName === ''}>
          Save
        </Button>
      </View>
    </Modal>
  );
};

export default ModalComponent;
