import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as Yup from 'yup';

class SignIn extends Component {

  signUp = userInputData => {
    const {username, password, email} = userInputData;
    Auth.signUp({
      username,
      password,
      attributes: {
        email,          // optional
        // other custom attributes
      },
    })
      .then(data => {
        console.log(data);
        console.log('SignUp 22');
      })
      .catch(err => console.log(err));
  }

  onSubmit = (userInputData) => {
    alert(JSON.stringify(userInputData, null, 2));
    this.signUp(userInputData);
  };
  render() {
    const {onSubmit} = this;
    const initialValues = {
      email: '',
      password: '',
      firstName: '',
      phoneNumber: '',
      username: '',
      passwordConfirm: ''
    };

    const VALIDATION_SCHEMA = Yup.object().shape({
      email: Yup.string().required('Required').email('Email must be valid: example@mail.com'),
      password: Yup.string().required('Required').min(8, 'Too short'),
      firstName: Yup.string().required('Required').min(2, 'Too short'),
      phoneNumber: Yup.string().min(10, 'Too short'),
      username: Yup.string().required('Required').min(3, 'Too short'),
      passwordConfirm: Yup.string().min(8, 'Too short').oneOf([Yup.ref('password'), null], "Passwords must match")
        .required('Password confirm is required')
    });

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={90}>
        <ScrollView
          bounces={true}
        >
          <View style={styles.container}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={VALIDATION_SCHEMA}
            >
              {({handleChange, handleSubmit, values, errors, touched, handleBlur, isSubmitting}) => (
                <View>
                  <View style={styles.inputWrapper}>
                    <Text>
                      First name <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      textContentType='name'
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder='firstName'
                      style={styles.input}
                    />
                    {errors.firstName && touched.firstName ? <Text style={styles.error}> {errors.firstName}</Text> : null}
                  </View>

                  <View style={styles.inputWrapper}>
                    <Text>
                      Email address <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      textContentType='emailAddress'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder='email'
                      style={styles.input}
                    />
                    {errors.email && touched.email ? <Text style={styles.error}> {errors.email}</Text> : null}
                  </View>

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
                      Phone number
                    </Text>
                    <TextInput
                      textContentType='telephoneNumber'
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      value={values.phoneNumber}
                      placeholder='phoneNumber'
                      style={styles.input}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? <Text style={styles.error}> {errors.phoneNumber}</Text> : null}

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

                  <View style={styles.inputWrapper}>
                    <Text>
                      Password confirm  <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                      textContentType='password'
                      onChangeText={handleChange('passwordConfirm')}
                      onBlur={handleBlur('passwordConfirm')}
                      value={values.passwordConfirm}
                      placeholder='passwordConfirm'
                      style={styles.input}
                    />
                    {errors.passwordConfirm && touched.passwordConfirm ? <Text style={styles.error}> {errors.passwordConfirm}</Text> : null}
                  </View>

                  <View style={styles.inputWrapper}>
                    <Button
                      title='Sign Up'
                      onPress={handleSubmit}
                      disabled={Object.keys(errors).length > 0 && isSubmitting}
                    />
                  </View>
                </View>
              )}
            </Formik>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>

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
  },
  buttonWrapper: {
    marginBottom: 15
  }
});

export default SignIn;