import {createStackNavigator} from "react-navigation-stack";
import SignIn from "../components/signIn/SignIn";
import SignUp from '../components/signUp/SignUp';
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import ForgotPasswordConfirm from "../components/forgotPassword/ForgotPasswordConfirm";

const routeConfigs = {
  SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
  ForgotPasswordConfirm: {
    screen: ForgotPasswordConfirm,
  }
};

const stackNavigatorConfig = {
  initialRouteName: 'SignIn',
};

const authStackNavigator = createStackNavigator(routeConfigs, stackNavigatorConfig);

export default authStackNavigator;