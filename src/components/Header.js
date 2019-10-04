import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {createTodo} from "../graphql/mutations";
import {listTodos} from "../graphql/queries";
import {connect} from 'react-redux';
import {fetchQuery, onCreateTodoSubscription, setDialog} from "./actions";
import Dialog from "./Dialog";
import {graphQLOperation} from './helpers';
import {onCreateTodo} from "../graphql/subscriptions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      showDialog: false,
      subscription: null
    }
  }

  componentDidMount() {
    const subscription = this.props.onCreateTodoSubscription(onCreateTodo);
    this.setState({subscription});
  };

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  };

  createTodo = todo => {
    console.log(todo);
    console.log('create todo Header 32');
    return graphQLOperation(createTodo, {input: todo});
  };

  createNewTodo() {
    const {inputValue} = this.state;
    if (this.state.inputValue.length > 0) {
      const todo = { name: inputValue, description: "Realtime and Offline", completed: false, time: '06.05.1996'};
      this.createTodo(todo)
        .then(response => {
          if (response.data.createTodo.name === inputValue) {
            this.setState({
              inputValue: '',
              dialogMessage: inputValue
            });
          }
        })
        .catch(error => {
          console.log('______________________________________');
          console.log('Header 55 catch error');
          console.log(error);
        });
    } else
      alert('Todo list name shouldn\'t be empty')
  };

  handleTextInput = (text) => {
    this.setState({inputValue: text});
  };

  render() {
    const {inputValue, dialogMessage} = this.state;
    return (
      <View style={styles.container}>
        {this.props.showDialog ? <Dialog/> : null}
        <TextInput
          style={styles.input}
          onChangeText={text => this.handleTextInput(text)}
          value={inputValue}
          placeholder='Todo'
        />
        <Button
          title='Add todo'
          onPress={this.createNewTodo}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5
  },
  button: {
    width: '30%'
  },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5
  }
});

const mapStateToProps = state => ({
  showDialog: state.dialog.showDialog,
});

const mapDispatchToProps = (dispatch) => ({
  getTodos: (data) => dispatch(fetchQuery(data)),
  onCreateTodoSubscription: subscription => dispatch(onCreateTodoSubscription(subscription)),
  setDialog: (value, title, message) => dispatch(setDialog(value, title, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);