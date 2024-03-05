// styles.js
import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
  wrap: {
    width: '90%',
    padding: 24,
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    display: 'flex',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    marginTop: 16,
    borderBottomColor: 'grey',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    color: 'black',
  },
  warning: {
    color: '#DC143C',
    paddingTop: 4,
    textAlign: 'left',
    paddingLeft: 8,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#303545',
    padding: 10,
    borderRadius: 12,
    width: '100%',
    color: 'black',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#303545',
    padding: 10,
    opacity: 0.7,
    borderRadius: 12,
    width: '100%',
    color: 'black',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 18,
    color: 'white',
    fontWeight: '600',
  },
  signUpBtnText: {
    color: '#f5f5dc',
    textDecorationLine: 'underline',
  },
  signUpWrapTextwrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
