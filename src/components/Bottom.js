import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {setFilter} from "./actions";

const Bottom = ({setFilter}) => {
  return (
    <View  style={{flex: 1}}>
      <View style={styles.container}>
      <Button
        title="All"
        onPress={() => {setFilter('all')}}
      />
      <Button
        title="Active"
        onPress={() => {setFilter('active')}}
      />
      <Button
        title="Completed"
        onPress={() => {setFilter('completed')}}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
 //   borderColor: 'red',
   // borderWidth: 2,
  },
  button: {
    width: '30%'
  }
});

const mapDispatchToProps = dispatch => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
});

export default connect(null, mapDispatchToProps)(Bottom);