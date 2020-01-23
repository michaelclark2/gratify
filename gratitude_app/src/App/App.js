import React from 'react';

import {
  mapping,
  light,
  dark,
} from '@eva-design/eva';

import { ApplicationProvider } from 'react-native-ui-kitten';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from 'react-native-firebase';

import HomeScreen from '../screens/HomeScreen';

import RegisterScreen from '../screens/RegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const RootStack = createStackNavigator({
  Home: HomeScreen,
}, {
  initialRouteName: 'Home'
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Register: RegisterScreen,
}, {
  headerMode: 'screen'
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

class App extends React.Component {
  state = {
    hasNotifications: false,
    gotMessage: false
  }
  componentDidMount () {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          this.setState({hasNotifications: enabled})
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              this.setState({hasNotifications: true})
            });
        }
      });

    this.messageListener = firebase.messaging().onMessage((msg) => {
      console.log(msg);
    });

    firebase.messaging().getToken().then(token => console.log('token', token)).catch(console.error)

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log(notification)
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log(notification);
        // Process your notification as required
    });

  }

  componentWillUnmount () {
    this.messageListener();
  }

  render () {
    const theme = this.state.hasNotifications ? dark : light;
    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppContainer/>
      </ApplicationProvider>
    );
  }
};

export default App;
