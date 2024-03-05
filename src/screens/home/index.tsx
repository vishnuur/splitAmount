import React, {useState} from 'react';
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
import {onSaveGroup} from '../../redux/reducers/groupsReducer';
import {clearAddedData} from '../../redux/reducers/historyReducer';

const HomeScreen = ({navigation}: any) => {
  const {currentUser, users} = useAppSelector(state => state.users);
  const {groups} = useAppSelector(state => state.groups);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState('');
  const [visibleModal, setVisibleModal] = React.useState(false);

  const dispatch = useAppDispatch();

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);

  const onPressUser = (data: FormValuesType) => {
    navigation.navigate('UserDetails', data);
  };

  const onPressImage = (data: FormValuesType | any) => {
    setselectedImage(data.imageUrl);
    setVisible(true);
  };

  //  const handleModalOutsidePress = () => {
  //    setVisible(false);
  //  };

  const saveGroupNameFn = (value: string) => {
    dispatch(onSaveGroup(value));
    hideModal();
  };

  //  console.log('groups', groups);
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
            <Text style={homeStyle.name}>{item}</Text>
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
            <Text style={homeStyle.heading}>
              Hi, {currentUser?.first_name} {currentUser?.last_name}
            </Text>
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
