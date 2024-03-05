import {KeyboardTypeOptions, Text, View} from 'react-native';
import React, {Component} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {loginStyles} from '../../screens/login/style';

interface CustomInput {
  placeholder: string;
  handleChange: (value: string) => void;
  secureTextEntry?: boolean;
  value: string;
  onSubmitEdit?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  warning?: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: () => void;
}

const CustomInput = ({
  placeholder,
  handleChange,
  secureTextEntry,
  value,
  onSubmitEdit,
  autoCapitalize,
  warning,
  keyboardType,
  onBlur,
}: CustomInput) => {
  return (
    <View>
      <TextInput
        style={loginStyles.input}
        placeholder={placeholder}
        placeholderTextColor="grey"
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        value={value}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEdit}
        keyboardType={keyboardType}
        onBlur={onBlur}
      />
      {warning && <Text style={loginStyles.warning}>{warning}</Text>}
    </View>
  );
};
export default CustomInput;
