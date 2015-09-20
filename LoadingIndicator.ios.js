'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  View,
  ActivityIndicatorIOS,

} = React;


class LoadingIndicator extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicatorIOS
          size='large'
          animating={true} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
    activityContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

module.exports = LoadingIndicator;
