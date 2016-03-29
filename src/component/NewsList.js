'use srtict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var PixelRatio = require('PixelRatio');
var Platform= require('Platform');
var AppHeight = require('Dimensions').get('window').height;
var AppWidth = require('Dimensions').get('window').width;

var RouteMapper = require('./RouteMapper');

var{
  Component,
  Navigator,
  StyleSheet,
  ListView,
  ScrollView,
  WebView,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableHighlight,
} = React;

class NewsList extends Component{
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Card}>
        </View>
        <View style={[styles.Card,{flexDirection:'column',}]}>
          <View style={{flex:1,backgroundColor:'#11a354'}}>
          </View>
          <View style={{flex:1,backgroundColor:'#118fa3',flexDirection:'column',alignItems:'center',justifyContent:'space-between',}}>
            <View style={{backgroundColor:'#6edaeb',width:30,height:30,margin:8,}}>
            </View>
            <View style={{backgroundColor:'#6eeba7',width:30,height:30,margin:10,}}>
            </View>
            <View style={{backgroundColor:'#00baff',width:80,height:80,margin:5,}}>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  Container:{
    backgroundColor:'#ececec',
    flex:1,
    flexDirection:'row',
  },
  Card:{
    flex:1,
    borderWidth:1,
    borderColor:'#3c3079',
    margin:20,
    height:500,
  },
});

module.exports = NewsList;
