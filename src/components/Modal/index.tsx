import React from 'react';
import {Modal, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {style} from './style';

interface modalInterface {
  visible: boolean;
  handleModalOutsidePress: () => void;
  children: any;
}
const ModalComponent = ({
  handleModalOutsidePress,
  visible,
  children,
}: modalInterface) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity style={style.container} activeOpacity={1}>
        <TouchableOpacity onPress={handleModalOutsidePress}>
          <Text>X</Text>
        </TouchableOpacity>
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalComponent;
