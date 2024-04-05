import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/home';
import LoginScreen from '../screens/login';
import RegistrationScreen from '../screens/registration';
import CustomIcon from '../components/CustomIcons';
import UserDetails from '../screens/expenseList';
import imagePaths from '../constants/images';
import ExpenseChart from '../screens/charts/basicExpenseChart';
import DetailedChart from '../screens/charts/detailedPieChart';

const Stack = createStackNavigator();

const StackNavigator = ({navigation}: any) => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
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
            backgroundColor: '#121B22',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: params => {
            console.log(route.params, 'paramssss');
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Charts', route.params.id);
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{
                        uri: (route.params as any)?.imageUrl ?? imagePaths[0],
                      }}
                      style={styles.headerImage}
                    />
                    <Text style={{color: 'white', fontSize: 18}}>
                      {(route.params as any).title || 'User name'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          },
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
      name="Charts"
      component={ExpenseChart}
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
      name="DetailedCharts"
      component={DetailedChart}
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
const AuthNavigator = ({navigation}: any) => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'black',
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

export {StackNavigator, AuthNavigator};
