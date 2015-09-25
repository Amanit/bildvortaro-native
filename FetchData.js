'use strict'
var REQUEST_URL = 'http://bildvortaro.com/api/word';


class FetchData {
  list(filter='', dataSource, cb) {
    var url = `${REQUEST_URL}/?format=json`;
    if(filter){
      url = `${url}&search=${filter}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        return cb({
            dataSource: dataSource.cloneWithRows(responseData.results),
            loaded: true,
            wordCount: responseData.count,
            nextUrl: responseData.next
        });
      })
      .done();
  }
  details(word_id, cb) {
    var url = `${REQUEST_URL}/${word_id}/?format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        return cb({
            details: responseData,
            loaded: true,
        });
      })
      .done();
  }
  load_tail(nextUrl, dataSource, cb) {

    fetch(nextUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData)
        var exist_words = dataSource._dataBlob.s1.slice();
        var new_words = exist_words.concat(responseData.results)
        return cb({
            dataSource: dataSource.cloneWithRows(new_words),
            loading_tail: false,
            wordCount: responseData.count,
            nextUrl: responseData.next
        });
      })
      .done();
  }
}

module.exports = new FetchData();
