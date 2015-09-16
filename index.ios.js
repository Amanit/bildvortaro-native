'use strict';

var React = require('react-native');
var {
  Component,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  View,
  TabBarIOS,
  ActivityIndicatorIOS,
} = React;


var REQUEST_URL = 'http://bildvortaro.com/api/word/?format=json';

class bildvortaro extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      selectedBar: 'main'
    };
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <TabBarIOS style={styles.tab_bar}>
        <TabBarIOS.Item
          title='main view'
          icon={require('image!list')}
          selected={this.state.selectedBar == 'main'}
          onPress={() => this.setState({selectedBar: 'main'})}
        >
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderMovie}
              style={styles.listView}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='search'
          icon={require('image!search')}
          selected={this.state.selectedBar == 'search'}
          onPress={() => this.setState({selectedBar: 'search'})}
        >
          <View style={styles.container}>
            <Text>
              searching movies...
            </Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>


    )
  }
  renderLoadingView() {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicatorIOS
          size='large'
          animating={true} />
      </View>
    );
  }
  renderMovie(card) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.thumbnail}
          source={{uri: card.thumb}}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{card.name}</Text>
        </View>
       </View>
     );
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.results),
            loaded: true,
        });
      })
      .done();
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingLeft: 10,
    },
    activityContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('bildvortaro', () => bildvortaro);
