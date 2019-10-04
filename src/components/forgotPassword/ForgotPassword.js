import React, {Component} from 'react';
import {Formik} from 'formik';
import {View, Text, TextInput, StyleSheet, Button} from "react-native";
import * as Yup from "yup";

class ForgotPassword extends Component {
  static navigationOptions = {
    title: 'forgot',
    // header: null ,
  };

  state = {
    showCodeInput: false
  };

  onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    window.setTimeout(()=>{this.props.navigation.navigate('ForgotPasswordConfirm')}, 3000);
  };

  render() {
    const initialValues = {
     username: '',
    };
    const VALIDATION_SCHEMA = Yup.object().shape({
      username: Yup.string().required('Required').min(3, 'Too short'),
    });

    return (
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validationSchema={VALIDATION_SCHEMA}
        >
          {({handleChange, handleSubmit, values, errors, touched, handleBlur, isSubmitting}) => (
            <View>
              <View style={styles.inputWrapper}>
                <Text>
                  Username <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  textContentType='username'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  placeholder='username'
                  style={styles.input}
                />
                {errors.username && touched.username ? <Text style={styles.error}> {errors.username}</Text> : null}
              </View>

              <View>
                <Button
                  title='Send'
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
              </View>

            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const border = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderColor: 'red',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5
  },
  inputWrapper: {
    marginBottom: 20
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
  error: {
    color: 'red',
    fontSize: 16
  },
  required: {
    color: 'red'
  }
});

export default ForgotPassword;