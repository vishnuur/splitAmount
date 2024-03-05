// styles.js
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#121B22',
    display: 'flex',
    alignItems: 'center',
  },
  drawerImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '100%',
  },
  drawerImage: {
    width: 80,
    height: 80,
    borderRadius: 90,
  },
  logoutBtn: {
    width: '100%',
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutbtnText: {
    fontSize: 16,
    color: 'white',
  },
  drawerCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
