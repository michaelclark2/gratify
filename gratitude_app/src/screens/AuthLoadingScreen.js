import React from 'react';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

import firebase from 'react-native-firebase';
import { ActivityIndicator } from 'react-native';

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
        <ActivityIndicator size="large"/>
      </Layout>
    )
  }
}

export default AuthLoadingScreen;
