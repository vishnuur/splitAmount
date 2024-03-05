// styles.js
import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
    paddingLeft: 16,
  },
  drawerbutton: {
    backgroundColor: 'red',
    height: 60,
  },
  imageWrap: {
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentBg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  userImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 94,
    objectFit: 'cover',
  },
  detailWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    padding: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    fontWeight: '600',
    color: '#E3DFDE',
  },
  data: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
    minWidth: 124,
  },
  inputStyle: {
    padding: 0,
  },
  editWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  editButton: {paddingLeft: 12},
  registertime: {
    color: 'white',
    fontSize: 12,
    paddingTop: 4,
  },
  datawrap: {
    paddingLeft: 12,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  name: {
    fontWeight: '500',
    color: 'white',
    fontSize: 16,
    textTransform: 'capitalize',
    paddingLeft: 12,
  },
  payedBy: {
    fontWeight: '500',
    color: 'grey',
    fontSize: 14,
    textTransform: 'capitalize',
    paddingLeft: 12,
    paddingTop: 8,
  },
  splitValue: {
    color: 'green',
  },
  splitValueOwe: {
    color: 'orange',
  },
  contentWrap: {
    display: 'flex',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
