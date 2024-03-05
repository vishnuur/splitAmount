import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import RegistrationScreen from '../screens/registration';
import ExpenseAdd from '../screens/expenseAdd';
import CustomIcon from '../components/CustomIcons';
import UserDetails from '../screens/userDetails';
import imagePaths from '../constants/images';

const Stack = createStackNavigator();

const StackNavigator = ({navigation}: any) => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={() => {
        return {
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{marginLeft: 16}}>
              <CustomIcon>
                <MaterialIcon name="menu" />
              </CustomIcon>
            </TouchableOpacity>
          ),
        };
      }}
    />
    <Stack.Screen
      name="UserDetails"
      component={UserDetails}
      options={({route}: any) => {
        return {
          drawerLabel: 'User Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#232D36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: (route.params as any)?.imageUrl ?? imagePaths[0],
                }}
                style={styles.headerImage}
              />
              <Text style={{color: 'white', fontSize: 18}}>
                {(route.params as any) || 'User name'}
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginLeft: 16}}>
              <CustomIcon>
                <MaterialIcon name="arrow-back" />
              </CustomIcon>
            </TouchableOpacity>
          ),
        };
      }}
    />
    <Stack.Screen
      name="ExpenseAdd"
      component={ExpenseAdd}
      options={() => {
        return {
          drawerLabel: 'User Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#232D36',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: 'Add Expense',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginLeft: 16}}>
              <CustomIcon>
                <MaterialIcon name="arrow-back" />
              </CustomIcon>
            </TouchableOpacity>
          ),
        };
      }}
    />
  </Stack.Navigator>
);
const styles = StyleSheet.create({
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 54,
    marginRight: 8,
  },
});

export default StackNavigator;
