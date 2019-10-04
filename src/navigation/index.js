import {createSwitchNavigator, createAppContainer} from "react-navigation";
import authNavigation from "./authNavigation";
import appFlowNav from "./appFlowNav";


const routeConfig = {
  Auth: {
    screen: authNavigation,
  },
  App: {
    screen: appFlowNav
  }
};

const switchNavigatorConfig = {
  initialRouteName: 'Auth',
};

const switchNavigator = createSwitchNavigator(routeConfig, switchNavigatorConfig);

export default createAppContainer(switchNavigator);