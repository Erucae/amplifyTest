import {createStackNavigator} from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";

const routeConfigs = {
  Home: {
    screen: HomeScreen
  },
};

const stackNavigatorConfig = {
  initialRouteName: 'Home',
};

const appStackNavigator = createStackNavigator(routeConfigs, stackNavigatorConfig);

export default appStackNavigator;