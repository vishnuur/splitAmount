import {KeyboardTypeOptions, Text, View} from 'react-native';
import React, {Component} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {loginStyles} from '../../screens/login/style';

interface CustomInput {
  placeholder: string;
  handleChange: (value: string) => void;
  secureTextEntry?: boolean;
  value?: string;
  onSubmitEdit?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  warning?: string;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: () => void;
  customStyle?: any;
  defaultValue?: any;
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
  customStyle,
  defaultValue,
}: CustomInput) => {
  return (
    <>
      <TextInput
        style={[loginStyles.input, customStyle]}
        placeholder={placeholder}
        placeholderTextColor="grey"
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange}
        value={value}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmitEdit}
        keyboardType={keyboardType}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
      {warning && <Text style={loginStyles.warning}>{warning}</Text>}
    </>
  );
};
export default CustomInput;
