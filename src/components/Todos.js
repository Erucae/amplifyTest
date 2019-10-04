import React, {Component} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import ActivityIndicator from "./ActivityIndicator";
import {connect} from 'react-redux';
import {listTodos} from "../graphql/queries";
import {fetchQuery, onUpdateTodoSubscription} from "./actions";
import {updateTodo} from "../graphql/mutations";
import {onUpdateTodo} from "../graphql/subscriptions";
import {graphQLOperation} from './helpers';

class Todos extends Component {
  state = {
    updateTodoSubscription: null
  };

  getData() {
    this.props.getTodos(listTodos);
  };

  componentDidMount() {
    const updateTodoSubscription = this.props.onUpdateTodoSubscription(onUpdateTodo) ;
    this.setState({updateTodoSubscription});
    this.getData();
  };

  componentWillUnmount() {
    this.state.updateTodoSubscription.unsubscribe();
  };

  handleTodoPress = todo => {
    graphQLOperation(updateTodo, {input: {...todo, time: '05.06.1995', completed: !todo.completed}})
      .catch(error => {
        console.log(error);
        console.log('Todos 24');
      });
  };

  filterTodos = () => {
    const {todos, filter} = this.props;
    switch (filter) {
      case 'all': return todos;
      case 'active': return todos.filter(todo => !todo.completed);
      case 'completed': return todos.filter(todo => todo.completed);
      default: return todos;
    }
  };

  render() {
    const {loading} = this.props;

    const listData = this.filterTodos().map(todo => ({
      id: todo.id,
      name: todo.name,
      description: todo.description,
      time: todo.time,
      active: todo.active,
      all: todo.all,
      completed: todo.completed
    }));

    if(loading)
      return <ActivityIndicator/>;

    return (
      <View
        style={styles.container}
        // onMoveShouldSetResponderCapture={(event => true)}
      >
        <SafeAreaView>
          <FlatList
            keyExtractor={(item) => item.id}
            data={listData}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                onPress={() => {this.handleTodoPress(item)}}
                // onShowUnderlay={separators.highlight}
                // onHideUnderlay={separators.unhighlight}
              >
                <View style={{backgroundColor: 'white', flex: 1}}>
                  <Text
                    style={[styles.text, item.completed? styles.completedTodo:null]}
                  >
                    {item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            />

        </SafeAreaView>

      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    marginLeft: 5,
   // borderColor: 'black',
   // borderWidth: 2
    // height: 100
  },
  text: {
    fontSize: 22,
  },
  completedTodo: {
    textDecorationLine: 'line-through'
  }
})

const mapStateToProps = state => ({
  todos: state.queryReducer.todos,
  loading: state.queryReducer.loading,
  filter: state.filterReducer.filter
});

const mapDispatchToProps = (dispatch) => ({
  getTodos: (data) => dispatch(fetchQuery(data)),
  onUpdateTodoSubscription: newTodo => dispatch(onUpdateTodoSubscription(newTodo)),
}) ;

export default connect(mapStateToProps, mapDispatchToProps)(Todos);