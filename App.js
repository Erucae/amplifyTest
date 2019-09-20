import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/components/store';
import HomeScreen from "./src/screens/HomeScreen";


const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen/>
    </Provider>

  );
};

export default App;