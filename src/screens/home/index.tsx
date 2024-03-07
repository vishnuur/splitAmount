import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Portal, Button, PaperProvider} from 'react-native-paper';
import {BottomNavigation} from 'react-native-paper';

import {homeStyle} from './style';

import {FormValuesType} from '../registration';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import ModalComponent from './components/modal';
import {FAB} from 'react-native-paper';
import {getGroups, saveGroupData} from '../../redux/reducers/groupsReducer';
import {clearAddedData} from '../../redux/reducers/historyReducer';
import {listGroups} from '../../services/apis/groups';

const HomeScreen = ({navigation}: any) => {
  const {currentUser, token} = useAppSelector(state => state.users);
  const {groups} = useAppSelector(state => state.groups);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState('');
  const [visibleModal, setVisibleModal] = React.useState(false);

  const dispatch = useAppDispatch();

  const showModal = () => {
    setVisibleModal(true);
  };
  const hideModal = () => setVisibleModal(false);

  const onPressUser = (data: any) => {
    const payload = {
      title: data.title,
      id: data._id,
    };
    navigation.navigate('UserDetails', payload);
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

  const saveGroupNameFn = (grpupName: string, userName: string) => {
    const payload = {
      title: grpupName,
      usernames: [userName],
    };
    dispatch(saveGroupData(payload));
    hideModal();
    dispatch(getGroups(null));
  };

  const renderItem = ({item}: FormValuesType | any) => (
    <Pressable
      onPress={() => {
        onPressUser(item);
        dispatch(clearAddedData(''));
      }}
      key={item}>
      <View style={homeStyle.section}>
        <View style={homeStyle.leftpart}>
          {/*<TouchableOpacity onPress={() => onPressImage(item)}>
            <Image
              style={homeStyle.profileImage}
              source={{uri: item?.imageUrl}}
            />
          </TouchableOpacity>*/}
          <View style={homeStyle.datawrap}>
            <Text style={homeStyle.name}>{item.title}</Text>
          </View>
        </View>
        <Text style={homeStyle.registertime}>Tap to view more</Text>
      </View>
    </Pressable>
  );

  return (
    <PaperProvider>
      <Portal>
        <ModalComponent
          visible={visibleModal}
          handleModalOutsidePress={hideModal}
          onSave={saveGroupNameFn}
        />
      </Portal>
      <View style={homeStyle.container}>
        <View style={homeStyle.imageWrap}>
          <ImageBackground
            source={require('../../assets/Images/background.jpg')}
            style={homeStyle.backgroundImage}>
            <Text style={homeStyle.heading}>Hi, {currentUser}</Text>
          </ImageBackground>
        </View>
        <View style={homeStyle.detailWrap}>
          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={item => item}
          />
        </View>
        {/*<ModalComponent
          visible={visible}
          image={selectedImage}
          handleModalOutsidePress={handleModalOutsidePress}
        />*/}
        <FAB
          icon="plus"
          onPress={showModal}
          label="Create Group"
          style={homeStyle.fab}
        />
      </View>
    </PaperProvider>
  );
};

export default HomeScreen;
