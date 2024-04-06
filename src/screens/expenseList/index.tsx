import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
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
import {
  clearAddedData,
  getHistory,
  saveAddedData,
} from '../../redux/reducers/historyReducer';
import BottomModal from '../../components/BottomModal/index';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import AddExpense from '../expenseAdd';
import LinearGradient from 'react-native-linear-gradient';
import {expenseTypeImages} from '../../utils/getExpenseImage';
import Loader from '../../components/Loader';
import {getSingleGroupData} from '../../redux/reducers/groupsReducer';
import SettleUp from './components/settleUp';

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
  const {currentUser} = useAppSelector(state => state.users);

  const {groupData} = useAppSelector(state => state.groups);
  const {isLoading} = useAppSelector(state => state.general);
  const [settleAmount, setsettleAmount] = useState() as any;
  const [currentSelectedModal, setcurrentSelectedModal] = useState('');
  const data = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getHistory(data.id));
    dispatch(getSingleGroupData(data.id));
  }, [data, dataAddedSuccess]);

  const formatSplitText = (value: any) => {
    if (value < 0) {
      return {
        owe: true,
        text: `You owe ${Math.abs(parseFloat(value)).toFixed(2)}`,
      };
    } else {
      return {owe: false, text: `You lent ${parseFloat(value)?.toFixed(2)}`};
    }
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(
    () => (currentSelectedModal === 'add' ? ['30%', '80%'] : ['10%', '40%']),
    [currentSelectedModal],
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onConfirmSettleUp = (value: any) => {
    const payedUp = {
      id: data.id,
      newData: {
        amount: value,
        bhavya: 0 - value,
        date: new Date().toISOString(),
        description: '',
        expenseType: '',
        payedBy: {id: currentUser._id, name: currentUser.username},
        title: 'Payed Up',
        vishnu: value,
        settleUp: true,
      },
    };
    dispatch(saveAddedData(payedUp));
  };

  const renderItem = ({item}: FormValuesType | any) => {
    const imageSource = expenseTypeImages[item?.expenseType]; // Use function if available, otherwise use direct access

    return (
      <View key={item._id} style={homeStyle.editWrap}>
        <View style={homeStyle.section}>
          {/*<TouchableOpacity onPress={() => onPressImage(item)}>
          </TouchableOpacity>*/}

          <View style={homeStyle.datawrap}>
            <View style={homeStyle.dateWrap}>
              <Text style={homeStyle.registerDate}>
                {moment(item.date).format('DD')}
              </Text>
              <Text style={homeStyle.registertime}>
                {moment(item.date).format('MMM')}
              </Text>
            </View>
            {!item?.settleUp ? (
              <Image style={homeStyle.profileImage} source={imageSource} />
            ) : (
              <Image
                style={homeStyle.profileImage}
                source={require('../../assets/Icons/debtclear.jpeg')}
              />
            )}
            <View style={homeStyle.contentWrap}>
              {!item?.settleUp && (
                <Text style={homeStyle.name}>{item.title}</Text>
              )}
              {item?.settleup ? (
                <Text style={homeStyle.payedBy}>
                  {item.payedBy.name} Payed {item.amount}
                </Text>
              ) : (
                <Text style={homeStyle.payedBy}>
                  {item.amount} Payed by {item.payedBy.name}
                </Text>
              )}
            </View>
          </View>
          {!item?.settleUp && (
            <Text
              style={
                formatSplitText(item[currentUser.username]).owe
                  ? homeStyle.splitValueOwe
                  : homeStyle.splitValue
              }>
              {formatSplitText(item[currentUser.username]).text}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const calculateVishnuSum = () => {
    let totalVishnu = 0;

    history?.forEach((obj: any) => {
      if (obj.hasOwnProperty(currentUser.username)) {
        const vishnuValue = parseFloat(obj.vishnu);
        if (!isNaN(vishnuValue)) {
          totalVishnu += vishnuValue;
        }
      }
    });

    return totalVishnu;
  };
  useEffect(() => {
    setsettleAmount(Math.abs(parseInt(calculateVishnuSum().toFixed(2))));
  }, [history]);

  return (
    <BottomSheetModalProvider>
      <View style={homeStyle.container}>
        <View style={homeStyle.userImageWrap}>
          <LinearGradient
            colors={['#0BCF9D', '#24E0EB']}
            style={homeStyle.gradient}>
            <Text style={homeStyle.totalSum}>
              You {calculateVishnuSum() > 0 ? 'get back ' : 'owe '}
              {calculateVishnuSum().toFixed(2)}Rs
            </Text>
            <Button
              style={homeStyle.settleUp}
              onPress={() => {
                setcurrentSelectedModal('settle');
                handlePresentModalPress();
              }}
              icon="delete-empty"
              mode="contained"
              //disabled={!formData.title || !formData.amount}
            >
              Clear
            </Button>
          </LinearGradient>
        </View>
        {/* {isLoading && <Loader />} */}
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
        <FAB
          icon="plus"
          onPress={() => {
            setcurrentSelectedModal('add');
            handlePresentModalPress();
          }}
          label="Add expense"
          style={homeStyle.fab}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        contentHeight={360}>
        <BottomSheetView style={styles.contentContainer}>
          {currentSelectedModal === 'add' ? (
            <AddExpense groupData={groupData} />
          ) : (
            <SettleUp
              onConfirmSettleUp={onConfirmSettleUp}
              defaultValue={settleAmount}
            />
          )}
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
