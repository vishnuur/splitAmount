// Import necessary components from React and React Native
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';

import {loginStyles} from './style';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import showToast from '../../components/Toast';
import {FormValuesType} from '../registration';
import {setCurrentUser} from '../../redux/reducers/signupReducer';
import CustomInput from '../../components/CustomInput';
import {loginUser} from '../../services/apis/login';

const LoginScreen = ({navigation}: any) => {
  const {users, currentUser} = useAppSelector(state => state.users);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    const payload = {
      username: 'testuser',
      password: 'testpassword',
    };
    const result: any = await loginUser(payload);
    console.log(result, 'resultvalue');
    if (result.success) {
      showToast('Login Success');
      navigation.navigate('Home');
      dispatch(setCurrentUser(result.username));
    } else {
      showToast('Invalid credentials');
    }
  };

  const onSignUp = () => {
    navigation.navigate('Registration');
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/background.jpg')}
      style={loginStyles.backgroundImage}>
      <View style={loginStyles.container}>
        <View style={loginStyles.wrap}>
          <Text style={loginStyles.title}>Login</Text>

          <CustomInput
            handleChange={text => setemail(text)}
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            onSubmitEdit={handleSignIn}
            keyboardType="email-address"
          />
          <CustomInput
            handleChange={text => setPassword(text)}
            value={password}
            autoCapitalize="none"
            placeholder="Password"
            onSubmitEdit={handleSignIn}
            secureTextEntry={true}
          />

          <TouchableOpacity style={loginStyles.button} onPress={handleSignIn}>
            <Text style={loginStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={loginStyles.signUpWrapTextwrap}>
            <Text style={loginStyles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={[loginStyles.signUpText, loginStyles.signUpBtnText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
