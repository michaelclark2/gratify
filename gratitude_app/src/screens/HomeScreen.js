import React from 'react';
import {
  Layout,
  Text,
  Button,
} from 'react-native-ui-kitten';

import firebase from 'react-native-firebase';
import authData from '../api/authData';
import { AsyncStorage } from 'react-native';

class HomeScreen extends React.Component {

  state = {
    user: {}
  }

  componentDidMount() {
    AsyncStorage.getItem('firebase_id').then(firebase_id => {
      authData.getUserByFirebaseId(firebase_id)
        .then(user => {
          this.setState({user});
        })
    })
  }
  render () {
    return (
      <Layout level="2">
        <Text>ayelmao</Text>
        <Text>{this.state.user.id}</Text>
        <Text>{this.state.user.created_at}</Text>
        <Layout style={{padding: 20}}>
          <Button onPress={(e) => firebase.auth().signOut()}>wut?</Button>
        </Layout>
      </Layout>
    )
  }
}

export default HomeScreen;
