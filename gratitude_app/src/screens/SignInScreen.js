import React from 'react';
import {
  Layout,
  Input,
  Text,
  Button,
} from 'react-native-ui-kitten';
import firebase from 'react-native-firebase';

class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  signIn = (e) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  }

  render () {
    return (
      <Layout level="2">
        <Text>Sign In</Text>
        <Input value={this.state.email} onChangeText={(email) => this.setState({email})}/>
        <Input secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
        <Button onPress={this.signIn}>DO IT</Button>
      </Layout>
    )
  }
}

export default SignInScreen;
