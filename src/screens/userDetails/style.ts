// styles.js
import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#121B22',
  },
  userImageWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalSum: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  settleUp: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 20,
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
  profileImage: {
    width: 58,
    height: 58,
  },
  contentBg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
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
    padding: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
  dateWrap: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
  },
  registertime: {
    color: 'white',
    fontSize: 12,
    paddingTop: 4,
  },
  registerDate: {
    color: 'white',
    fontSize: 16,
    paddingTop: 4,
  },
  datawrap: {
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
