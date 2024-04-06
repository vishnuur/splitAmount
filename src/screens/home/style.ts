// styles.js
import {StyleSheet} from 'react-native';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#121B22',
    paddingTop: 0,
    padding: 12,
  },
  contentWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 200,
    marginRight: 22,
  },
  carouselWrap: {
    // margin: 24,
    width: '100%',
    // position: 'absolute',
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
    alignItems: 'flex-start',
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
    alignItems: 'center',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftpart: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageCover: {
    width: 42,
    height: 42,
    backgroundColor: '#12D4B4',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '80%',
    height: '80%',
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
  gradient: {
    position: 'absolute',
    display: 'flex',
    // flexDirection: 'row',
    width: '100%',
    height: 160,
    borderRadius: 28,
  },
  text: {
    color: 'white', // or any color you prefer
    fontSize: 20,
    marginBottom: 20,
    lineHeight: 30,
    fontWeight: '600',
  },
  welcomeWall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    padding: 24,
  },
  wallimage: {
    width: 140,
    height: 140,
    borderRadius: 94,
    objectFit: 'cover',
    position: 'absolute',
    right: 0,
    top: '20%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
  },
  groupCreateContainer: {
    padding: 24,
  },
});
