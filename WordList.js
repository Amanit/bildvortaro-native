'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight,
} = React;

var WordDetails = require('./WordDetails')
var LoadingIndicator = require('./LoadingIndicator');

class WordList extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ListView
        ref="listView"
        dataSource={this.props.dataSource}
        renderRow={this.renderWord.bind(this)}
        onEndReached={this.props.onEndReached}
        renderFooter={this.renderFooter.bind(this)}
        style={styles.listView}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        // showsVerticalScrollIndicator={false}
      />
    )
  }
  renderWord(card) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(card)}
        underlayColor='#ddd'
      >
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={{uri: card.thumb}}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{card.name}</Text>
          </View>
         </View>
       </TouchableHighlight>
     );
   }
   pressRow(rowData){
     this.props.navigator_link.push({
       title: 'Описание',
       component: WordDetails,
       passProps: {
         element: rowData
       }
     })
   }
   renderFooter() {
     if (!this.props.loading_tail) {
       return <View></View>
     }
     return (
       <LoadingIndicator />
     )
   }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 80,
        height: 80,
        // borderRadius: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    listView: {
        backgroundColor: '#F5FCFF',
    },
});

module.exports = WordList;
