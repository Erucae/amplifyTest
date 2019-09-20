import React from 'react';
import {View, Button, StyleSheet} from 'react-native';


const Bottom = () => {
  return (
    <View  style={{flex: 1}}>
      <View style={styles.container}>
      <Button
        title="All"
        onPress={() => {}}
      />
      <Button
        title="Active"
        onPress={() => {}}
      />
      <Button
        title="Completed"
        onPress={() => {}}
      />
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: 'red',
    borderWidth: 2,
  },
  button: {
    width: '30%'
  }
});
export default Bottom;