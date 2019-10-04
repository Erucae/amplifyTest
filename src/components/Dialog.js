import React, {Component} from 'react';
import { View, Alert, StyleSheet, Button} from 'react-native';
import {connect} from "react-redux";
import {setDialog} from "./actions";

const Dialog = ({ title, message, setDialog }) => {
  return (
    <View>
      {Alert.alert(
        title,
        message,
        [
          {
            text: 'Cancel',
            onPress: () => {setDialog(false, '', '')},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {setDialog(false, '', '')} },
        ],
        { cancelable: false }
      )}
    </View>

  );
};

const mapStateToProps = state => ({
  title: state.dialog.title,
  message: state.dialog.message,
});

const mapDispatchToProps = dispatch => {
  return {
    setDialog: (value, title, message) => dispatch(setDialog(value, title, message)),
  }
}


export default connect(null, mapDispatchToProps)(Dialog);