// styles.js
import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#121B22',
  },
  menuBtn: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 12,
    top: 12,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    paddingTop: 16,
    textAlign: 'left',
  },
  drawerbutton: {
    backgroundColor: 'red',
    height: 60,
  },
  imageWrap: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 94,
    objectFit: 'cover',
  },
  detailWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  section: {
    alignItems: 'flex-start',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftpart: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 94,
    objectFit: 'cover',
  },
  datawrap: {
    paddingLeft: 12,
    display: 'flex',
    justifyContent: 'space-around',
  },
  name: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  email: {
    color: 'grey',
    fontSize: 14,
  },
  registertime: {
    color: 'grey',
    fontSize: 12,
    paddingTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
