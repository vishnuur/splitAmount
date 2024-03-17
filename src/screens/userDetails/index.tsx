import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {homeStyle} from './style';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {updateUsers} from '../../redux/reducers/signupReducer';
import {FormValuesType} from '../registration';
import CustomIcon from '../../components/customIcons';
import {Button, FAB} from 'react-native-paper';
import moment from 'moment';
import {clearAddedData, getHistory} from '../../redux/reducers/historyReducer';
import BottomModal from '../../components/BottomModal/index';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import AddExpense from '../expenseAdd';

interface UserData {
  text: string;
  imagePath: string;
}

interface editInterface {
  first_name: string;
  last_name: string;
}

const UserDetails = ({route}: any) => {
  const dispatch = useAppDispatch();
  const {history, dataAddedSuccess} = useAppSelector(state => state.history);
  const data = route.params;
  const navigation = useNavigation();
  const currentUser = {name: 'vishnu'};

  useEffect(() => {
    dispatch(getHistory(data.id));
  }, [data, dataAddedSuccess]);

  const formatSplitText = (value: number) => {
    if (value < 0) {
      return {owe: true, text: `You owe ${Math.abs(value).toFixed(2)}`};
    } else {
      return {owe: false, text: `You lent ${value.toFixed(2)}`};
    }
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '80%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = ({item}: FormValuesType | any) => (
    <View key={item.title} style={homeStyle.editWrap}>
      <View style={homeStyle.section}>
        {/*<TouchableOpacity onPress={() => onPressImage(item)}>
            <Image
              style={homeStyle.profileImage}
              source={{uri: item?.imageUrl}}
            />
          </TouchableOpacity>*/}

        <View style={homeStyle.datawrap}>
          <Text style={homeStyle.registertime}>
            {moment(item.date).format('DD MMM')}
          </Text>
          <View style={homeStyle.contentWrap}>
            <Text style={homeStyle.name}>{item.title}</Text>
            <Text style={homeStyle.payedBy}>
              {item.amount} Payed by {item.payedBy}
            </Text>
          </View>
        </View>
        <Text
          style={
            formatSplitText(item[currentUser.name]).owe
              ? homeStyle.splitValueOwe
              : homeStyle.splitValue
          }>
          {formatSplitText(item[currentUser.name]).text}
        </Text>
      </View>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <View style={homeStyle.container}>
        <ImageBackground
          style={homeStyle.contentBg}
          source={require('../../assets/Images/whatsappbg.jpg')}>
          <View style={homeStyle.userImageWrap}>
            <Button
              onPress={() => {
                dispatch(clearAddedData(''));
              }}
              icon="camera"
              mode="contained"
              //disabled={!formData.title || !formData.amount}
            >
              Settle Up
            </Button>
          </View>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </ImageBackground>
        <FAB
          icon="plus"
          onPress={() => handlePresentModalPress()}
          label="Add expense"
          style={homeStyle.fab}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        contentHeight={360}>
        <BottomSheetView style={styles.contentContainer}>
          <AddExpense groupData={data} />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  contentContainer: {
    padding: 24,
  },
});

export default UserDetails;
