// styles.js
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 820,
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  dropDownBoxStyle: {
    width: '80%',
    zIndex: 100,
    marginTop: 12,
    marginBottom: 12,
  },
  dropDownContainerStyle: {
    zIndex: 100,
    backgroundColor: 'white',
  },
  customButton: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
