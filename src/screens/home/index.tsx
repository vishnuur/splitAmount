import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {homeStyle} from './style';

import {FormValuesType} from '../registration';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import CreateGroup from './components/createGroup';
import {FAB} from 'react-native-paper';
import {getGroups, createGroup} from '../../redux/reducers/groupsReducer';
import {clearAddedData} from '../../redux/reducers/historyReducer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {getUserId} from '../../utils/userDataUtils';

const HomeScreen = ({navigation}: any) => {
  const {currentUser, token} = useAppSelector(state => state.users);
  const {groups} = useAppSelector(state => state.groups);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState('');
  const width = Dimensions.get('window').width;

  const dispatch = useAppDispatch();

  const onPressUser = (data: any) => {
    const payload = {
      title: data.title,
      id: data._id,
    };
    navigation.navigate('UserDetails', payload);
  };

  const localImages = [
    require('../../assets/Images/icon1.png'),
    require('../../assets/Images/icon2.png'),
    require('../../assets/Images/icon3.png'),
    require('../../assets/Images/icon4.png'),
    require('../../assets/Images/icon5.png'),
    require('../../assets/Images/icon6.png'),
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * localImages.length);
    return localImages[randomIndex];
  };

  useEffect(() => {
    dispatch(getGroups(null));
  }, [navigation]);

  const onPressImage = (data: FormValuesType | any) => {
    setselectedImage(data.imageUrl);
    setVisible(true);
  };

  //  const handleModalOutsidePress = () => {
  //    setVisible(false);
  //  };

  const saveGroupNameFn = async (grpupName: string, userName: string) => {
    if (userName) {
      const userId = await getUserId(userName);
      if (userId.userId) {
        const payload = {
          title: grpupName,
          userIds: [userId.userId],
        };
        dispatch(createGroup(payload));
        dispatch(getGroups(null));
      }
    }
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = ({item}: FormValuesType | any) => {
    const randomImage = getRandomImage();

    return (
      <Pressable
        onPress={() => {
          onPressUser(item);
          dispatch(clearAddedData(''));
        }}
        key={item._id}>
        <View style={homeStyle.section}>
          <View style={homeStyle.leftpart}>
            <TouchableOpacity
              onPress={() => onPressImage(item)}
              style={homeStyle.imageCover}>
              <Image style={homeStyle.profileImage} source={randomImage} />
            </TouchableOpacity>
            <View style={homeStyle.datawrap}>
              <Text style={homeStyle.name}>{item.title}</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color="#12D4B4" />
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={homeStyle.container}>
        <View style={homeStyle.imageWrap}>
          <Text style={homeStyle.heading}>Hi, {currentUser}!</Text>
        </View>
        <View style={homeStyle.carouselWrap}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={2000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={() => (
              <View style={homeStyle.contentWrap}>
                <LinearGradient
                  colors={['#0BCF9D', '#24E0EB']}
                  style={homeStyle.gradient}>
                  <View style={homeStyle.welcomeWall}>
                    <Text style={homeStyle.text}>
                      Manage your
                      {'\n'}
                      expense{'\n'}
                      brilliantly
                    </Text>
                    <Image
                      source={require('../../assets/Images/purse.png')}
                      style={homeStyle.wallimage}
                      resizeMode="contain"
                    />
                  </View>
                </LinearGradient>
              </View>
            )}
          />
        </View>

        <View style={homeStyle.detailWrap}>
          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
        <FAB
          icon="plus"
          onPress={() => handlePresentModalPress()}
          label="Create Group"
          style={homeStyle.fab}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          contentHeight={360}>
          <BottomSheetView style={homeStyle.groupCreateContainer}>
            <CreateGroup onSave={saveGroupNameFn} />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
