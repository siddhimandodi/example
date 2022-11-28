/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {store, persistor} from './src/store';
 import { Provider } from 'react-redux';
 import { PersistGate } from 'redux-persist/integration/react';
 import Navigator from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
