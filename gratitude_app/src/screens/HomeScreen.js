import React from 'react';
import {
  Layout,
  Text,
  Button,
} from 'react-native-ui-kitten';

import firebase from 'react-native-firebase';

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

export default HomeScreen;
