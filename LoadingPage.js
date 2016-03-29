'use strict';

var React = require('react-native');

var {
  Navigator,
  Component,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

class LoadingPage extends Component{
  gotoMainPage(){
    this.props.navigator.push({
      id:'MainPage',
    });
  }

  render() {
    return (
      <View style={styles.Container}>
          <Text style={styles.MainTitle1}>加载数据中...</Text>
          <Text style={styles.MainText}>{this.props.tittle}为你呈现精彩内容</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#3EBFFF',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  MainTitle1:{
    fontSize:18,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold'
  },
  MainText:{
    fontSize:14,
    color:'#fff',
    textAlign:'left',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  Button:{
    height:28,
    backgroundColor:'#fff',
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    margin:16,
    padding:2
  },
  ButtonText:{
    color:'#3EBFFF',
    fontSize:24,
    fontWeight:'bold',
    justifyContent:'center',
    alignItems:'center',
  },
});

module.exports = LoadingPage;
