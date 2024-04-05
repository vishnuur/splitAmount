import {View} from 'react-native';
import LoaderKit from 'react-native-loader-kit';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 100,
      }}>
      <LoaderKit
        style={{width: 50, height: 50}}
        name={'LineScaleParty'} // Optional: see list of animations below
        color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
      />
    </View>
  );
};

export default Loader;
