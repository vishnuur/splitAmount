import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import StackNavigator from './StackNavigator';
import DrawerMenu from '../components/Hamburger';
import UserDetails from '../screens/userDetails';
import imagePaths from '../constants/images';
import CustomIcon from '../components/customIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerMenu {...props} />}
    screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Navigator" component={StackNavigator} />
   
  </Drawer.Navigator>
);



export default DrawerNavigator;
