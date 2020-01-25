import React from 'react';
import {
  Text
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

class Title extends React.Component {
  render () {
    return (
      <Text category='h1' style={style.title}>
        {this.props.children}
      </Text>
    )
  }
};

const style = StyleSheet.create({
  title: {
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});


export default Title;
