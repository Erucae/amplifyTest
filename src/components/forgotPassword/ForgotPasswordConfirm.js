import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

class ForgotPasswordConfirm extends Component {
  static navigationOptions = {
    header: null ,
  };

  onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  }

  render() {
    const initialValues = {
      username: '',
      confirmationCode: '',
      password: ''
    };
    const VALIDATION_SCHEMA = Yup.object().shape({
      username: Yup.string().required('Required').min(3, 'Too short'),
      confirmationCode: Yup.string().required('Required'),
      password: Yup.string().required('Required').min(8, 'Too short'),
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

              <View style={styles.inputWrapper}>
                <Text>
                  Confirmation code <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  textContentType='password'
                  onChangeText={handleChange('confirmationCode')}
                  onBlur={handleBlur('confirmationCode')}
                  value={values.confirmationCode}
                  placeholder='Confirmation code'
                  style={styles.input}
                />
                {errors.confirmationCode && touched.confirmationCode ? <Text style={styles.error}> {errors.confirmationCode}</Text> : null}
              </View>

              <View style={styles.inputWrapper}>
                <Text>
                  Password <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  textContentType='password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='password'
                  style={styles.input}
                />
                {errors.password && touched.password ? <Text style={styles.error}> {errors.password}</Text> : null}
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

export default ForgotPasswordConfirm;