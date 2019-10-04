import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/components/store';
import HomeScreen from "./src/screens/HomeScreen";
import Amplify from 'aws-amplify';
import Navigation from './src/navigation';

import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig);


const App = () => {
  return (
    <Provider store={store}>
      {/*<withAuthenticator>*/}
      {/*  <HomeScreen/>*/}
      {/*</withAuthenticator>*/}
      <Navigation/>
    </Provider>

  );
};

export default App;