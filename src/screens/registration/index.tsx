// Import necessary components from React and React Native
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {loginStyles} from '../login/style';
import {onSigningUp} from '../../redux/reducers/signupReducer';
import showToast from '../../components/Toast';
import CustomInput from '../../components/CustomInput';
// import {validateEmail} from '../../utils/validationUtils';

export interface FormValuesType {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegistrationScreen = ({navigation}: any) => {
  const {signUpSuccess} = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState<FormValuesType>({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldWarnings, setFieldWarnings] = useState<Partial<FormValuesType>>(
    {},
  );
  const [disableSubmit, setdisableSubmit] = useState(false);

  useEffect(() => {
    const errorsStatus = Object.values(fieldWarnings).every(
      value => value === '',
    );
    const valuesStatus = Object.values(formValues).every(value => !!value);
    if (errorsStatus && valuesStatus) {
      setdisableSubmit(false);
    } else {
      setdisableSubmit(true);
    }
  }, [fieldWarnings]);

  const handleInputChange = (inputName: keyof FormValuesType, text: string) => {
    setFormValues({
      ...formValues,
      [inputName]: text,
    });

    setFieldWarnings({
      ...fieldWarnings,
      [inputName]: '',
    });
  };

  const handleSignIn = () => {
    const newFieldWarnings: Partial<FormValuesType> = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        newFieldWarnings[key as keyof FormValuesType] = 'Field cannot be empty';
      }
    });

    if (formValues.password !== formValues.confirmPassword) {
      newFieldWarnings.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newFieldWarnings).length > 0) {
      setFieldWarnings(newFieldWarnings);
      //  showToast(
      //    'Please fill in all required fields and make sure passwords match',
      //  );
      return;
    }
    dispatch(onSigningUp(formValues));
    if (signUpSuccess) {
      showToast('Successfully registered');
      navigation.navigate('Login');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/wallpaper.png')}
      style={loginStyles.backgroundImage}
      blurRadius={1}>
      <View style={loginStyles.container}>
        <View style={loginStyles.wrap}>
          <CustomInput
            handleChange={text => handleInputChange('username', text)}
            value={formValues.username}
            placeholder="Username"
            warning={fieldWarnings.username}
          />
          <CustomInput
            handleChange={text => handleInputChange('phone', text)}
            value={formValues.phone}
            placeholder="Phone"
            warning={fieldWarnings.phone}
          />
          <CustomInput
            handleChange={text => handleInputChange('email', text)}
            value={formValues.email}
            autoCapitalize="none"
            placeholder="Email"
            warning={fieldWarnings.email}
            keyboardType="email-address"
          />
          <CustomInput
            handleChange={text => handleInputChange('password', text)}
            value={formValues.password}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            warning={fieldWarnings.password}
          />
          <CustomInput
            handleChange={text => handleInputChange('confirmPassword', text)}
            onSubmitEdit={handleSignIn}
            value={formValues.confirmPassword}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm Password"
            warning={fieldWarnings.confirmPassword}
          />
          <TouchableOpacity
            disabled={disableSubmit}
            style={[
              loginStyles.button,
              disableSubmit && loginStyles.disabledButton,
            ]}
            onPress={handleSignIn}>
            <Text style={loginStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegistrationScreen;
