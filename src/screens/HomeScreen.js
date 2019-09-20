import React from 'react';
import {View} from 'react-native';
import Header from "../components/Header";
import Todos from "../components/Todos";
import Bottom from "../components/Bottom";

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Header/>
      <Todos/>
      <Bottom/>
    </View>
  );
};

export default HomeScreen;