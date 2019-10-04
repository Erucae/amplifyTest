import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

class SignUpConfirm extends Component {

  onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  render() {
    const initialValues = {
      username: '',
      confirmationCode: ''
    };
    const VALIDATION_SCHEMA = Yup.object().shape({
      username: Yup.string().required('Required').min(3, 'To short'),
      confirmationCode: Yup.string().required('required'),
    });

    return (
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={this.onSubmit}
        >
          {({handleChange, handleSubmit, values, errors, touched, handleBlur, isSubmitting}) => (
            <View>
              <View>
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
              <Button
                title='Submit'
                onPress={handleSubmit}
                disabled={isSubmitting}
              />

            </View>
          )}

        </Formik>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 5
    // alignItems: 'center',
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

export default SignUpConfirm;