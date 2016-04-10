'use strict';

var React = require('react-native');

var {
  Component,
  Navigator,
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  ListView,
} = React;

var THEMSE_URL = 'http://news-at.zhihu.com/api/4/themes';

class ThemeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2
      }),
    }
  }

  componentWillMount() {
    this.fetchThemse();
  }

  fetchThemse() {
    fetch(THEMSE_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.others)
        })
      })
      .done();
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          showsVerticalScrollIndicator={true} />
        <Text>{this.state.dataSource.name}</Text>
      </View>
    );
  }

  renderRow(themes) {
    return (
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => this.props.navigator.replace({
          id: 'HomeScreen',
          themes: themes.id}
        )} >
        <View style={{marginLeft:20,flexDirection:'row',alignItems:'center',}}>
          <Text style={{fontFamily:'MaterialIcons-Regular',fontSize:27,color:'#B3B3B3',}}>
            add
          </Text>
          <Text style={{marginLeft:20,fontSize:14,color:'#B3B3B3',}}>{themes.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

var styles = StyleSheet.create({
  Card:{
    height:40,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#f6f6f6',
  },
  IconFont:{
    marginRight:20,
    color:'#fff',
    fontSize:24,
    fontFamily:'MaterialIcons-Regular',
  },
  MainTitle:{
    marginLeft:20,
    color:'#B3B3B3',
    fontSize:14,
  },
});

module.exports = ThemeList;
