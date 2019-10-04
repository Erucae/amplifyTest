import {createStackNavigator} from "react-navigation-stack";
import {createSwitchNavigator} from "react-navigation";
import ForgotPassword from '../components/forgotPassword/ForgotPassword';
import ForgotPasswordConfirm from "../components/forgotPassword/ForgotPasswordConfirm";

const routeConfig = {
  ForgotPassword: {
    screen: ForgotPassword,
  },
  ForgotPasswordConfirm: {
    screen: ForgotPasswordConfirm,
  }
};

const navigatorConfig = {
  initialRouteName: 'ForgotPassword'
};

const forgotPasswordNavigation = createSwitchNavigator(routeConfig, navigatorConfig);
export default forgotPasswordNavigation;