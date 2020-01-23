import React from 'react';
import {
  Layout,
  Text,
  Button,
  Input
} from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';


import Title from '../components/Title/Title';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  state = {
    email: '',
    password: ''
  }

  signUp = (e) => {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        // POST UID TO API HERE
        console.log('user.uid', user.uid)
      })
      .catch(err => {
        this.setState({isError: true, error: err.message})
      })
  }

  sendToSignIn = (e) => {
    this.props.navigation.navigate('SignIn')
  }

  render () {
    return (
      <Layout height={'100%'} level="4">
        <Title>Register</Title>
        <Layout level="4" style={style.signInScreen}>
          <Input style={style.inputField} placeholder="Email" value={this.state.email} onChangeText={(email) => this.setState({email})}/>
          <Input style={style.inputField} placeholder="Password" secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
          {
            this.state.isError ? (<Text status="danger">{this.state.error}</Text>) : null
          }
          <Button style={style.inputField} onPress={this.signUp}>Create Account</Button>
          <Button style={style.inputField} onPress={this.sendToSignIn} status="info" >Already have an account?</Button>
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

export default RegisterScreen;
