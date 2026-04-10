/**
 * React Native App with React Navigation
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from '@/config/dva';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AppNavigator />
    </Provider>
  );
}

export default App;
