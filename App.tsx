import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import DrawerNavigator from './src/navigation/AppNavigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
  return (
    <BottomSheetModalProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </BottomSheetModalProvider>
  );
}

export default App;
