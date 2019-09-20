import React, {Component} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Text, TouchableHighlight} from 'react-native';
import ActivityIndicator from "./ActivityIndicator";
import {connect} from 'react-redux';
import API, {graphqlOperation} from "@aws-amplify/api";
import {listTodos} from "../graphql/queries";
import config from "../../aws-exports";
import PubSub from "@aws-amplify/pubsub";
import {fetchQuery} from "./actions";

API.configure(config) ;            // Configure Amplify
PubSub.configure(config);

class Todos extends Component {

  getData() {
    this.props.getTodos(listTodos);
  };

  componentDidMount() {
    this.getData();
    console.log("some data1");
    console.log(this.props.todos);
  };

  listData = this.props.todos.map(todo => ({
    id: todo.id,
    title: todo.name,
    description: todo.description,
    time: todo.time
  }));

  render() {
    const {todos, loading} = this.props;

    const listData = todos.map(todo => ({
      id: todo.id,
      title: todo.name,
      description: todo.description,
      time: todo.time
    }));

    if(loading)
      return <ActivityIndicator/>

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={listData}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => {}}
                // onShowUnderlay={separators.highlight}
                // onHideUnderlay={separators.unhighlight}
              >
                <View style={{backgroundColor: 'white'}}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableHighlight>
            )}
            />

        </SafeAreaView>

      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    alignItems: 'center',
    // height: 100
  }
})

const mapStateToProps = state => ({
  todos: state.todos,
  loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
  getTodos: (data) => dispatch(fetchQuery(data)),
}) ;

export default connect(mapStateToProps, mapDispatchToProps)(Todos);