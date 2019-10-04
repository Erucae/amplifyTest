import React from 'react';
import {View} from 'react-native';
import Header from "../components/Header";
import Todos from "../components/Todos";
import Bottom from "../components/Bottom";

const HomeScreen = (props) => {
  return (
    <View style={{flex: 1}}>
      <Header/>
      <Todos/>
      <Bottom/>
      {console.log(props)}
      {console.log('HomeScreen 14')}
    </View>
  );
};

export default HomeScreen;