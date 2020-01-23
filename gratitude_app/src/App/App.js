/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { AsyncStorage } from 'react-native';

import {
  mapping,
  light,
  dark,
} from '@eva-design/eva';

import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
} from 'react-native-ui-kitten';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from 'react-native-firebase';


class OtherScreen extends React.Component {
  state = {
    isAuthed: false,
    user: null
  }

  render () {
    return (
      <Layout>
        <Text>You are now on another screen {this.state.isAuthed ? this.state.user.uid : ""}</Text>
        <Button>yep</Button>
      </Layout>
    )
  }
}

class HomeScreen extends React.Component {
  render () {
    return (
      <Layout level="2">
        <Text>ayelmao</Text>
        <Layout style={{padding: 20}}>
          <Button onPress={(e) => firebase.auth().signOut()}>wut?</Button>
        </Layout>
      </Layout>
    )
  }
}

class SignInScreen extends React.Component {
  signIn = (e) => {
    firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
  }
  render () {
    return (
      <Layout>
        <Text>Sign In</Text>
        <Button onPress={this.signIn}>DO IT</Button>
      </Layout>
    )
  }
}

class RegisterScreen extends React.Component {
  render () {
    return (
      <Layout>
        <Text>New User</Text>
      </Layout>
    )
  }
}

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.checkAuthStatus();
  }

  checkAuthStatus = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
    })
  }

  render () {
    return (
      <Layout>
        <Text>Loading Auth</Text>
      </Layout>
    )
  }
}

const RootStack = createStackNavigator({
  Home: HomeScreen,
  OtherScreen: OtherScreen
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Register: RegisterScreen,
})

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

    firebase.messaging().getToken().then(token => console.log(token)).catch(console.error)

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
