import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TextInput, SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import * as Yup from 'yup';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Sign In',
    headerBackTitle: 'Back to sign in'
  };

  async signIn(userInputData) {
    const {username, password} = userInputData;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      console.log('SignIn 16');
      if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        alert(user.challengeName + ' signIn 17 at if(SMS_MFA || SOFTWARE_TOKEN_MFA)');

        // const code = getCodeFromUserInput();
        // const loggedUser = await Auth.confirmSignIn(
        //   user,
        //   code,
        //   mfaType
        // );
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const {requiredAttributes} = user.challengeParam;
        alert(user.challengeName + ' signIn 30 at if(NEW_PASSWORD_REQUIRED)');
        // the array of required attributes, e.g ['email', 'phone_number']
        // const {username, email, phone_number} = getInfoFromUserInput();
        // const loggedUser = await Auth.completeNewPassword(
        //   user,
        //   newPassword,
        //   {
        //     email,
        //     phone_number,
        //   }
        // );
      } else if (user.challengeName === 'MFA_SETUP') {
        await Auth.setupTOTP(user);
      } else {
        console.log(user);
        console.log('SignIN 45');
      }
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
      } else if (err.code === 'PasswordResetRequiredException') {
      } else if (err.code === 'NotAuthorizedException') {
      } else if (err.code === 'UserNotFoundException') {
      } else {
        console.log(err);
      }
    }
  };

  onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
    console.log('values SignIn61');
    this.signIn(values)
      .then((response => {
        console.log(response);
        console.log('SignIn response 65');
      }))
      .catch(error => {
        console.log(error);
        console.log('SignIn response 65');
      });
  };

  render() {
    const {onSubmit} = this;
    const initialValues = {
      password: '',
      username: '',
    };
    const VALIDATION_SCHEMA = Yup.object().shape({
      password: Yup.string().required('Required').min(8, 'Too short'),
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
                  textContentType='name'
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

              <View style={styles.signInWrapper}>
                <Button
                  title='alert on Press'
                  onPress={() => {alert('on Press')}}
                />

                <Button
                  title='Sign in'
                  onPress={() => { alert('handle submit'); handleSubmit()}}
                  disabled={isSubmitting}
                />
              </View>

              <View style={styles.buttonsInRowContainer}>
                <View style={styles.buttonWrapper}>
                  <Button
                    title='Forgot password'
                    onPress={() => {this.props.navigation.navigate('ForgotPassword')}}
                  />
                </View>

                <View style={styles.buttonWrapper}>
                  <Button
                    title='Sign Up'
                    onPress={() => {this.props.navigation.navigate('SignUp')}}

                  />
                </View>
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
  signInWrapper: {
    marginBottom: 20
  },
  buttonsInRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonWrapper: {
    marginHorizontal: 10
  }
});

export default SignIn;