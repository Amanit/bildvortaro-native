'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  TextInput,
  View,
  ActivityIndicatorIOS,
  ScrollView,
} = React;


class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          // onChangeText={this.props.onNewSearch}
          onSubmitEditing={this.props.onNewSearch}
          onFocus={this.props.onFocus}
          placeholder='Введите слово'
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
    search: {
      marginTop: 64,
    },
    input: {
      fontSize: 15,
      flex: 1,
      height: 30,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 5
    }
});

module.exports = SearchBar;
