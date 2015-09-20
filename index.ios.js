'use strict';

var React = require('react-native');

var {
  Component,
  AppRegistry,
  NavigatorIOS,
  TextInput,
} = React;

var AppContainer = require('./AppContainer.js')


class BildVortaro extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigatorIOS
        ref='nav'
        style={{flex: 1}}
        initialRoute={{
          component: AppContainer,
          title: 'Слова',
        }}
      />
    )
  }
}

AppRegistry.registerComponent('bildvortaro', () => BildVortaro);
