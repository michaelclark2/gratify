import React from 'react';
import {
  Layout,
  Text,
} from 'react-native-ui-kitten';

import firebase from 'react-native-firebase';

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

export default AuthLoadingScreen;
