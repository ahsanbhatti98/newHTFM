import _ from "lodash";
import React, { createContext, Component } from "react";
import { StatusBar, View, SafeAreaView  } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import RootNavigator from "./navigator";
import { navigatorRef } from "./services/NavigationService";
import singleton from "./singleton";
import SplashScreen from "react-native-splash-screen";
import { Colors, Metrics } from "./theme";
import utility from "./utility";
import HttpServiceManager from "./services/HttpServiceManager";
import constant from "./constants";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Spinner from "react-native-globalspinner";
import Reachability from "react-native-reachability-popup";
import Orientation from 'react-native-orientation-locker'

export const LoginContext = createContext();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.setRole = this.setRole.bind(this);
    this.state = {
      isLogin: false,
      role_id: 0,
      setLogin: this.setLogin,
      setRole: this.setRole,
      isReduxLoaded: false,
    };
  }

  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL);
    Orientation.addDeviceOrientationListener((e) => { 
      Orientation.getAutoRotateState((isAutoRotate => {
        isAutoRotate ? Orientation.unlockAllOrientations() : Orientation.lockToPortrait()
      }))
     })
  }

  setLogin = (isLogin = true) => {
    this.setState({ isLogin });
  };
  setRole = (role = null) => this.setState({ role_id: role });

  onBeforeLift = () => {
    singleton.storeRef = store;
    utility.setStoreRef(store);
    this.setState({ isReduxLoaded: true }, () => {
      SplashScreen.hide();
      this.setLogin(!_.isEmpty(store.getState().user.data));
      if (!_.isEmpty(store.getState().user.data)) {
        console.log("CHala kia");
        HttpServiceManager.getInstance().userToken =
          store.getState().user.data.token;
        this.setRole(store.getState().user.data.role_id);
      }
    });
  };

  render() {
    const { isReduxLoaded, setLogin, isLogin } = this.state;

    return (
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.primary.white}
        />

        <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            {isReduxLoaded ? (
              <LoginContext.Provider value={this.state}>
                <RootNavigator ref={navigatorRef} />
              </LoginContext.Provider>
            ) : (
              <View />
            )}
          </SafeAreaView>
        </PersistGate>

        <FlashMessage position="top" />
        <Spinner color={Colors.primary.theme} />

        <Reachability />
      </Provider>
    );
  }
}
