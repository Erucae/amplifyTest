import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import API, {graphqlOperation} from "@aws-amplify/api";
import {createTodo} from "../graphql/mutations";
import PubSub from '@aws-amplify/pubsub';
import config from "../../aws-exports";

API.configure(config) ;            // Configure Amplify
PubSub.configure(config);

class Header extends Component {
  state = {
    inputValue: ''
  };

  async createNewTodo() {
    const todo = { name: this.state.inputValue , description: "Realtime and Offline"};
    await API.graphql(graphqlOperation(createTodo, { input: todo }));
  };

  handleTextInput = (text) => {
    if(text && text.length > 0)
      this.setState({inputValue: text});
  };

  render() {
    const {inputValue} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{}}
          onChangeText={text => this.handleTextInput(text)}
          value={this.state.inputValue}
          placeholder='Todo'
        />
        <Button
          title='Add todo'
          onPress={() => this.createNewTodo()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    // flex: 2,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: '30%'
  }
});

export default Header;