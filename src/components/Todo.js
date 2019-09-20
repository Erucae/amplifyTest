import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

const Todo = ({todo}) => {

  return (
    <View style={styles.container}>
      <Text>{todo.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Todo;