import React from 'react';
import {
  Layout,
  Text,
  Icon
} from '@ui-kitten/components';
import Title from '../components/Title/Title';

class GratitudeScreen extends React.Component {
  render() {
    return (
      <Layout>
        <Title>Gratitudes</Title>
        <Icon name="star" height={30} fill="orange"  />
      </Layout>
    );
  }
};

export default GratitudeScreen;
