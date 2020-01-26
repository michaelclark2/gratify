import React from 'react';
import {
  Layout,
  Text,
  Button,
} from '@ui-kitten/components';

import firebase from 'react-native-firebase';
import authData from '../api/authData';
import { AsyncStorage } from 'react-native';
import Title from '../components/Title/Title';
import ThemedScreen from './ThemedScreen';

class HomeScreen extends ThemedScreen {

  state = {
    user: {
      grats: [],
      entries: []
    }
  }

  loadUser = () => {
    AsyncStorage.getItem('firebase_id').then(firebase_id => {
      authData.getUserByFirebaseId(firebase_id)
        .then(user => {
          this.setState({user});
        })
    })
  }

  componentDidMount() {
    this.loadUser();
  }

  render () {
    const { user } = this.state;
    return (
      <Layout level="2">
        <Title>Gratify</Title>
        {
          user && user.created_at ? (
            <Layout>
              <Text>{user.id}</Text>
              <Text>{user.created_at}</Text>
              <Text>Gratitudes: {user.grats.length}</Text>
              <Text>Entries: {user.entries.length}</Text>
            </Layout>
          ) : null
        }
        <Layout style={{padding: 20}}>
          <Button onPress={(e) => firebase.auth().signOut()}>wut?</Button>
        </Layout>
      </Layout>
    )
  }
}

export default HomeScreen;
