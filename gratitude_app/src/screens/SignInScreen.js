import React from 'react';
import {
  Layout,
  Input,
  Text,
  Button,
} from 'react-native-ui-kitten';
import firebase from 'react-native-firebase';

import Title from '../components/Title/Title';
import { StyleSheet } from 'react-native';

class SignInScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  state = {
    email: '',
    password: '',
  }

  signIn = (e) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        this.setState({isError: true, error: err.message})
      });
  }

  sendToRegister = (e) => {
    this.props.navigation.navigate('Register')
  }

  render () {
    return (
      <Layout height={'100%'} level="4">
        <Title>Sign In</Title>
        <Layout level="4" style={style.signInScreen}>
          <Input style={style.inputField} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
          <Input style={style.inputField} secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
          {
            this.state.isError ? (<Text>{this.state.error}</Text>) : null
          }
          <Button style={style.inputField} onPress={this.signIn}>Sign In</Button>
          <Button style={style.inputField} onPress={this.sendToRegister} status="info" >Don't have an account?</Button>
        </Layout>
      </Layout>
    )
  }
}

const style = StyleSheet.create({
  signInScreen: {
    marginLeft: 50,
    marginRight: 50
  },
  inputField: {
    marginTop: 10,
  }
})

export default SignInScreen;
