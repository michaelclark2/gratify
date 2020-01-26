import React from 'react';

// Maps together eva theme with React-Navigation theme
class ThemedScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    const { theme } = screenProps;
    return {
      headerTintColor: theme[theme['text-basic-color'].replace('$', '')],
      headerStyle : {
        backgroundColor: theme[theme['background-basic-color-4'].replace('$', '')]
      }
    }
  }
}

export default ThemedScreen;
