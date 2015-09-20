'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var LoadingIndicator = require('./LoadingIndicator');
var fetcher = require('./FetchData')


class WordDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  render() {
    var content = <LoadingIndicator />
    if(this.state.loaded) {
      content = this.getContent()
    }
    return (
      <View style={styles.main}>
        { content }
      </View>
    )
  }
  getContent() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{uri: this.state.details.thumb}}
        />
        <Text style={styles.title}>{this.state.details.name}</Text>
        <Text style={styles.description}>{this.state.details.description}</Text>
       </View>
    )
  }
  componentDidMount() {
    // this.state.dataSource,
    fetcher.details(this.props.element.id,
      (results) => {
        this.setState(results);
      });
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 70
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
      flex: 1,
  },
  thumbnail: {
      width: 160,
      height: 160,
  },
  title: {
      fontSize: 20,
      textAlign: 'center',
  },
  description: {
      fontSize: 15,
      textAlign: 'center',
  },
});

module.exports = WordDetails;
