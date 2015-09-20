'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  StyleSheet,
  Text,
  ListView,
  View,

} = React;

var SearchBar = require('./SearchBar');
var WordList = require('./WordList');
var LoadingIndicator = require('./LoadingIndicator');
var fetcher = require('./FetchData')


class AppContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      loading_tail: false,
      page: 1,
      wordCount: null,
      nextUrl: null,
    };
  }
  render() {
    if (!this.state.loaded) {
      var MainView = <LoadingIndicator />
    } else {
      var MainView = <WordList
        ref="listWrapper"
        dataSource={this.state.dataSource}
        onEndReached={this.onListEndReached.bind(this)}
        loading_tail={this.state.loading_tail}
        navigator_link={this.props.navigator}
      />
    }

    return (
      <View style={styles.main}>
        <SearchBar
          onNewSearch={this.onNewSearch.bind(this)}
          onFocus={this.onSearchFocus.bind(this)}
        />
        { MainView }
      </View>
    )
  }
  componentDidMount() {
    this.fetchData('');
  }
  onSearchFocus() {
    this.refs.listWrapper.refs.listView.getScrollResponder().scrollTo(0, 0)
  }
  fetchData(filter='') {
    fetcher.list(filter, this.state.dataSource,
      (results) => {
        this.setState(results);
      }
    );
  }
  onListEndReached() {
    if(this.state.loading_tail || !this.state.nextUrl) {
      return
    }
    this.setState({
      loading_tail: true
    })
    fetcher.load_tail(this.state.nextUrl, this.state.dataSource,
      (results) => {
        this.setState(results);
      }
    );
  }
  onNewSearch(event) {
    this.fetchData(event.nativeEvent.text)
  }

}

var styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      padding: 10
    },
});

module.exports = AppContainer;
