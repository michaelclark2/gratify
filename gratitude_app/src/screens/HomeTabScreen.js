import React from 'react';
import {
  Layout,
  Spinner,
  Icon,
  withStyles,
  BottomNavigation,
  BottomNavigationTab
} from '@ui-kitten/components';
import { AsyncStorage } from 'react-native';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import authData from '../api/authData'

import PromptEntryScreen from './PromptEntryScreen';
import GratitudeScreen from './GratitudeScreen';
import OptionsScreen from './OptionsScreen';

const TabBar = ({ navigation }) => {
  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };
  const getIconName = (routeName) => {
    switch (routeName) {
      case 'Gratitudes':
        return 'star';
      case 'Entries':
        return 'book';
      case 'Options':
        return 'settings-2';
    }
  }
  const getIconForRoute = (routeName, isSelected) => {
    const iconName = getIconName(routeName);
    return (styles) => <Icon name={ isSelected ? iconName : iconName + '-outline'} {...styles} />
  }

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect}>
        {

          navigation.state.routes.map(r => {
            const {routes, index} = navigation.state;
            const isActiveRoute = routes[index].routeName === r.routeName;
            const icon = getIconForRoute(r.routeName, isActiveRoute);
            return <BottomNavigationTab title={r.routeName} icon={icon} key={r.routeName} />
          })
        }
      </BottomNavigation>
    </SafeAreaView>
  )
}

const TabStack = createBottomTabNavigator({
  Gratitudes: GratitudeScreen,
  Entries: PromptEntryScreen,
  Options: OptionsScreen
}, { tabBarComponent: TabBar });

const TabContainer = createAppContainer(TabStack);

class HomeTabScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

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
      <Layout height={'100%'} level="3">
        {
          user && user.created_at ? (
            <TabContainer screenProps={{theme: this.props.theme}} />
          ) : <Spinner />
        }

      </Layout>
    )
  }
}

export default withStyles(HomeTabScreen);
